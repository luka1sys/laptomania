const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');

// მოდელის სქემა
const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        lowercase: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
        maxlength: 20,
        select: false


    },
    role: {
        type: String,
        enum: ["user", "moderator", "admin"],
        default: "user",

    },
    isVerified: { // email-ვერიფიკაციისთვის
        type: Boolean,
        default: false
    },
    verifycationCode: String,
    emailVerificationExpires: Date,  // email ვერიფიკაციის კოდი
    // მომხემარებლის პროფილის აქტიურობა
    isAcyive: {

        type: Boolean,
        default: true
    }

}, {
    // როდის მოხდა შექმნა 
    timestamps: true
})
// პაროლის ჰეშირება 
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();  // ❗ საკითხს აგვარებს
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
// ვადარებთ ახლა შემოყვანილ პაროლსა  და ბაზაში არსებულ პაროლს და აქ დაგვიბრუნდება ture ან false 
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.signToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

userSchema.methods.createEmailVerificationToken = function () {
    const code = crypto.randomBytes(32).toString('hex');
    this.verifycationCode = code;
    this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24h
    return code;
}

// ვქმნით სქემას 
const User = mongoose.model('User', userSchema, 'users')
module.exports = User