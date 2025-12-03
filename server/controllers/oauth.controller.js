const axios = require('axios');
const User = require('../models/user.model');
const AppError = require('../utils/appError');





// google oauth
const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v1/userinfo';

// github oauth
const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GITHUB_USERINFO_URL = "https://api.github.com/user";


// google oauth
const createSendToken = (user, res) => {
    const token = user.signToken();

    res.cookie('lg', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None'
    });

    return res.redirect(`${process.env.CLIENT_URL}/panel`);
};
const getGoogleAuthUrl = (req, res) => {
    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        response_type: 'code',
        scope: 'openid email profile',
        access_type: 'offline',
        prompt: 'consent',
    });

    res.redirect(`${GOOGLE_AUTH_URL}?${params.toString()}`);
}
const googleCallBack = async (req, res, next) => {
    try {
        const { code } = req.query;
        const tokenResponse = await axios.post(GOOGLE_TOKEN_URL, {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: 'authorization_code'


        })

        const { access_token } = tokenResponse.data;
        const userInfo = await axios.get(GOOGLE_USERINFO_URL, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        const { verified_email, name, email, picture, id } = userInfo.data;


        let user = await User.findOne({ email });
        if (user) {

            createSendToken(user, res);
            return;
        }
        if (!verified_email) {
            return next(new AppError('email not verified', 400))
        }

        user = await User.create({
            fullname: name,
            email,
            image: picture,
            oauthId: id,
            oauthProvider: 'google',
            isAcyive: true,
            isVerified: true

        })


        createSendToken(user, res);

    } catch (err) {
        console.log(err)

    }

}



const getGithubAuthUrl = (req, res) => {
    const rootUrl = 'https://github.com/login/oauth/authorize';
    const params = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID,
        redirect_uri: process.env.GITHUB_REDIRECT_URI,
        scope: 'read:user user:email',
    });

    res.redirect(`${rootUrl}?${params.toString()}`);
};

const githubCallback = async (req, res) => {
    try {
        const { code } = req.query;

        const tokenResponse = await axios.get('https://github.com/login/oauth/access_token', {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
                redirect_uri: process.env.GITHUB_REDIRECT_URI
            }
        });

        const accessToken = new URLSearchParams(tokenResponse.data).get('access_token');

        const userInfo = await axios.get('https://api.github.com/user', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        console.log(userInfo.data);

        const { name, email, avatar_url, id } = userInfo.data;

        let user = await User.findOne({ email });
        if (user) {
            createSendToken(user, res);
            return;
        }

        user = await User.create({
            fullname: name,
            email,
            image: avatar_url,
            oauthId: id,
            oauthProvider: 'github',
            isAcyive: true,
            isVerified: true

        })
        createSendToken(user, res);
    } catch (err) {
        console.log(err);
    }
}
module.exports = { googleCallBack, getGoogleAuthUrl, githubCallback, getGithubAuthUrl } 