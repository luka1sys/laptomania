const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const protect = catchAsync(async (req, res, next) => {

    const token = req.cookies.lg;
    if (!token) {
        return next(new AppError('You are not logged in', 401));

    }
    const dcoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(dcoded.id);
    if (!user) {
        return next(new AppError('You are not logged in', 401));
    }
    req.user = user;
    next();

    
})
module.exports = { protect }
// უნდა დავამთავროო ეს midlewaree