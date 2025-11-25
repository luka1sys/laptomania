const nodemailer = require('nodemailer');


const trasporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async options => {
    try {
        await trasporter.sendMail({
            from: '"Laptomania" <no-reply>',
            to: options.to,
            subject: options.subject,
            html: options.html
        });
    } catch (err) {
        console.error('Error sending email:', err);
    }
};

module.exports = sendEmail;