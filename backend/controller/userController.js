const asyncHandler = require('express-async-handler')
// for password encrypt import bcrypt
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
// for token generate 
const jwt = require('jsonwebtoken')


// @desc Register a new user
// @dsec /api/users
// @access Public


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    // validation
    if (!name || !email || !password) {
        // return res.status(400).json({ message: "Please include all fields" })
        return res.status(400).json({ message: "Please include all fields" })
        // throw new Error("Please include all fields")

    }
    // find if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        return res.status(400).json({ message: "User already exists" })
        // throw new Error('User already exists')
    }

    // hash password ( actually we want user encrypt password) and what is salt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        return res.status(400).json({ message: "Inavalid user data" })

    }


})
// @desc Login user
// @dsec /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    //  check user and password match
    if (user && (await bcrypt.compare(password, user.password))) {
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)

        })
    } else {
        return res.status(401).json({ message: "Invalid Credential" })
    }

})
// @desc Get current user
// @dsec /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    return res.status(200).json(user)
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '10d' })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}