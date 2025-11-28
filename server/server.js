const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const laptoprouter = require('./routes/laptop.routes');
const authRouter = require('./routes/auth.routes');
const oauthRouter = require('./routes/oauth.routes');
const cookieParser = require('cookie-parser');
// cybersecurity
//იცავს API-ს ბევრი მოთხოვნებისგან
// განსაზღვრავს თუ რამდენ მოთხოვნას შეუძლია მომხმარებელი გააკეთოს განსაზღვრულ დროში.
// const rateLimit = require('express-rate-limit');

// // იცავს MongoDB-ს ჰაკერული payload-ებისგან (მაგ. $gt, $set, $push).
// const mongooseSanitize = require('express-mongo-sanitize');
// // აყენებს უსაფრთხოების HTTP headers, რაც იცავს XSS და სხვა რისკებისგან ბაზას.
// const helmet = require('helmet');

// Rate Limiter Middleware
dotenv.config();


const app = express();


app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
// cybersecurity - rate limiter

app.use(cookieParser());
// app.use(mongooseSanitize());
app.use(express.json());
// app.use(helmet())
// app.use(
//     rateLimit({
//         windowMs: 2 * 60 * 1000, // 15 minutes
//         max: 200, // limit each IP to 100 requests per windowMs
//         message: 'Too many requests from this IP, please try again later.'
//     })
// );



// app.use('/laptop/images', express.static(path.join(__dirname, 'uploads/laptops')));

app.use('/api/laptop', laptoprouter);
app.use('/api/auth', authRouter);
app.use('/api/oauth',oauthRouter);









// ერორების სამართავი 
app.use((err, req, res, next) => {
    // 
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});



// ბაზასთან კავშირი 
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('connected to database');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT || 5000}`);
        })
    })
    .catch((err) => {
        console.log('database connection error:', err);
        // სრულად წყვეტს node პროცესს
        process.exit(1);
    })
