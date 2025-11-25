
const express = require('express')
const { signUp, login, updateUser, logout, verifyEmail, getUsers } = require('../controllers/auth.controller')
const { protect } = require('../middlewares/auth.middleware')
const restrictTo = require('../middlewares/roles.middleware')


const authRouter = express.Router()
authRouter.post('/signup', signUp)
authRouter.post('/login', login)
authRouter.patch('/update/:id', updateUser)
authRouter.get('/logout', logout)
authRouter.get('/users', protect, restrictTo('admin'), getUsers)
authRouter.get('/verify/:code', verifyEmail)
// auto login
authRouter.post('/auto-login', protect, async (req, res, next) => {
    res.status(200).json(req.user);

})


module.exports = authRouter