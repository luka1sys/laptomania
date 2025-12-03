
const express = require('express');
const { getGoogleAuthUrl, githubCallback, googleCallBack, getGithubAuthUrl } = require('../controllers/oauth.controller');
const oauthRouter = express.Router();


oauthRouter.get('/google/callback',googleCallBack)
oauthRouter.get('/google', getGoogleAuthUrl)
oauthRouter.get('/github', getGithubAuthUrl)
oauthRouter.get('/github/callback', githubCallback)


module.exports = oauthRouter



