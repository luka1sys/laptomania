

const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/email');


const createSendToken = (user, statusCode, res) => {
    token = user.signToken();
    const cookieOptions = {
        expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None'
    };
    user.password = undefined;
    res.status(statusCode).cookie('lg', token, cookieOptions).json({
        user,
        status: 'success',

        message: 'User logged in successfully'
    });
}








// signUp ფუნქცია 
const signUp = catchAsync(async (req, res, next) => {
    const { email, fullname, password } = req.body;
    const newUser = await User.create({ email, fullname, password });

    const code = newUser.createEmailVerificationToken();
    await newUser.save({ validateBeforeSave: false });

    const verificationUrl = `${req.protocol}://${req.get("host")}/api/auth/verify/${code}`;

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email - Laptomania</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
                background-color: #f5f5f5;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
            }
            .header {
                background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                padding: 40px 20px;
                text-align: center;
            }
            .logo {
                font-size: 32px;
                margin-bottom: 10px;
            }
            .header h1 {
                color: #ffffff;
                font-size: 28px;
                font-weight: 700;
                margin: 0;
            }
            .content {
                padding: 40px 30px;
            }
            .greeting {
                font-size: 20px;
                color: #1f2937;
                margin-bottom: 20px;
                font-weight: 600;
            }
            .message {
                color: #4b5563;
                font-size: 16px;
                line-height: 1.8;
                margin-bottom: 30px;
            }
            .verification-box {
                background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
                border-left: 4px solid #4f46e5;
                padding: 20px;
                margin: 30px 0;
                border-radius: 8px;
            }
            .verification-box p {
                margin: 0 0 15px 0;
                color: #374151;
                font-size: 14px;
            }
            .button-container {
                text-align: center;
                margin: 35px 0;
            }
            .verify-button {
                display: inline-block;
                background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                color: #ffffff;
                text-decoration: none;
                padding: 16px 40px;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                box-shadow: 0 4px 6px rgba(79, 70, 229, 0.3);
                transition: all 0.3s ease;
            }
            .verify-button:hover {
                box-shadow: 0 6px 12px rgba(79, 70, 229, 0.4);
                transform: translateY(-2px);
            }
            .alternative-link {
                background-color: #f9fafb;
                border: 1px solid #e5e7eb;
                border-radius: 6px;
                padding: 15px;
                margin: 20px 0;
            }
            .alternative-link p {
                font-size: 13px;
                color: #6b7280;
                margin-bottom: 8px;
            }
            .alternative-link a {
                color: #4f46e5;
                word-break: break-all;
                font-size: 12px;
                text-decoration: none;
            }
            .features {
                margin: 30px 0;
                padding: 20px;
                background-color: #fafafa;
                border-radius: 8px;
            }
            .features h3 {
                color: #1f2937;
                font-size: 18px;
                margin-bottom: 15px;
                text-align: center;
            }
            .feature-list {
                list-style: none;
                padding: 0;
            }
            .feature-list li {
                padding: 10px 0;
                color: #4b5563;
                font-size: 14px;
                border-bottom: 1px solid #e5e7eb;
            }
            .feature-list li:last-child {
                border-bottom: none;
            }
            .feature-list li::before {
                content: "✓";
                color: #10b981;
                font-weight: bold;
                margin-right: 10px;
                font-size: 16px;
            }
            .footer {
                background-color: #1f2937;
                color: #9ca3af;
                padding: 30px 20px;
                text-align: center;
                font-size: 13px;
            }
            .footer p {
                margin: 8px 0;
            }
            .footer a {
                color: #818cf8;
                text-decoration: none;
            }
            .social-links {
                margin: 20px 0;
            }
            .social-links a {
                display: inline-block;
                margin: 0 10px;
                color: #9ca3af;
                text-decoration: none;
                font-size: 12px;
            }
            .divider {
                height: 1px;
                background: linear-gradient(to right, transparent, #e5e7eb, transparent);
                margin: 30px 0;
            }
            .warning {
                background-color: #fef3c7;
                border-left: 4px solid #f59e0b;
                padding: 15px;
                margin: 20px 0;
                border-radius: 6px;
            }
            .warning p {
                color: #92400e;
                font-size: 13px;
                margin: 0;
            }
            @media only screen and (max-width: 600px) {
                .content {
                    padding: 30px 20px;
                }
                .header h1 {
                    font-size: 24px;
                }
                .verify-button {
                    padding: 14px 30px;
                    font-size: 15px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <!-- Header -->
            <div class="header">
                <div class="logo">💻</div>
                <h1>Laptomania</h1>
            </div>

            <!-- Content -->
            <div class="content">
                <p class="greeting">Hello ${fullname}! 👋</p>
                
                <p class="message">
                    Welcome to <strong>Laptomania</strong>! We're thrilled to have you join our community of laptop enthusiasts. 
                    You're just one step away from accessing amazing deals on the latest laptops.
                </p>

                <p class="message">
                    To complete your registration and activate your account, please verify your email address by clicking the button below:
                </p>

                <!-- Verification Button -->
                <div class="button-container">
                    <a href="${verificationUrl}" class="verify-button">Verify Email Address</a>
                </div>

                <!-- Alternative Link -->
                <div class="alternative-link">
                    <p><strong>Button not working?</strong> Copy and paste this link into your browser:</p>
                    <a href="${verificationUrl}">${verificationUrl}</a>
                </div>

                <div class="divider"></div>

                <!-- Features -->
                <div class="features">
                    <h3>What You'll Get:</h3>
                    <ul class="feature-list">
                        <li>Access to 500+ laptop models from top brands</li>
                        <li>Exclusive deals and special offers</li>
                        <li>Fast and secure checkout process</li>
                        <li>Order tracking and customer support</li>
                        <li>Personalized recommendations</li>
                    </ul>
                </div>

                <div class="divider"></div>

                <!-- Verification Info -->
                <div class="verification-box">
                    <p><strong>⏰ Important:</strong></p>
                    <p>This verification link will expire in <strong>24 hours</strong> for security reasons. If you don't verify your email within this time, you'll need to sign up again.</p>
                </div>

                <!-- Security Warning -->
                <div class="warning">
                    <p><strong>⚠️ Security Notice:</strong> If you didn't create an account with Laptomania, please ignore this email. Your email address will not be used without verification.</p>
                </div>

                <div class="divider"></div>

                <p class="message" style="margin-top: 30px;">
                    If you have any questions or need assistance, feel free to reach out to our support team at 
                    <a href="mailto:support@laptomania.com" style="color: #4f46e5; text-decoration: none;">support@laptomania.com</a>
                </p>

                <p class="message">
                    Best regards,<br>
                    <strong>The Laptomania Team</strong>
                </p>
            </div>

            <!-- Footer -->
            <div class="footer">
                <p><strong>Laptomania</strong></p>
                <p>Your trusted destination for laptops</p>
                
                <div class="social-links">
                    <a href="#">Facebook</a> |
                    <a href="#">Twitter</a> |
                    <a href="#">Instagram</a> |
                    <a href="#">LinkedIn</a>
                </div>

                <p style="margin-top: 20px;">
                    © ${new Date().getFullYear()} Laptomania. All rights reserved.
                </p>
                
                <p style="font-size: 11px; color: #6b7280; margin-top: 15px;">
                    This email was sent to ${email} because you signed up for a Laptomania account.
                </p>
            </div>
        </div>
    </body>
    </html>
    `;

    try {
        await sendEmail({
            to: newUser.email,
            subject: 'Welcome to Laptomania - Verify Your Email Address',
            html
        });

        res.status(201).json({
            status: 'success',
            message: 'User created successfully! Please check your email to verify your account.'
        });
    } catch (error) {
        newUser.emailVerificationToken = undefined;
        newUser.emailVerificationExpires = undefined;
        await newUser.save({ validateBeforeSave: false });

        return next(new AppError('Failed to send verification email. Please try again later.', 500));
    }
})

const getUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();
    if (!users) {
        return next(new AppError('No users found', 404));
    }
    res.status(200).json({
        status: 'success',
        users
    })




})

const verifyEmail = catchAsync(async (req, res, next) => {
    const code = req.params.code;

    const user = await User.findOne({
        verifycationCode: code,
        emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
        return next(new AppError('Invalid or expired verification link.', 400));
    }

    user.isVerified = true;
    user.verifycationCode = undefined;
    user.emailVerificationExpires = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        status: 'success',
        message: 'Email successfully verified!'
    });
});

// login 
const login = catchAsync(async (req, res, next) => {
    // ვიღებთ წვდომას ემაილზე და პაროლზე 
    const { email, password } = req.body
    // ვეძებთ ემაილს user კოლექციიდან 
    const user = await User.findOne({ email }).select('+password');
    // თუ არ გვაქვს user ვაბრუნებთ ერორის მმართელ ფუნქციას 
    if (!user) {
        return next(new AppError('your email or password is incorrect', 404))
    }

    const isPasswordCorrect = await user.comparePassword(password);
    // თუ არ ემთხვევა ვაბრუნებთ ერორს
    if (!isPasswordCorrect) {
        return next(new AppError('your email or password is incorrect', 404))
    }



    createSendToken(user, 200, res)

})

const updateUser = catchAsync(async (req, res, next) => {
    const userId = req.params.id; // URL პარამეტრიდან ვიღებთ
    const { fullname, email, password, role } = req.body;

    const updateData = { fullname, email, role };
    if (password) updateData.password = password;

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

    res.status(200).json({
        status: 'success',
        user
    });
});
const logout = catchAsync(async (req, res,) => {
    res.clearCookie('lg');
    res.status(200).json({
        status: 'success',
        message: 'User logged out successfully'
    });
})


// ექსპორტს ვუკეთებთ ფუნქციებსს 
module.exports = { signUp, login, updateUser, logout, verifyEmail, getUsers,createSendToken }
