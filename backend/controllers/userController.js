const jwt = require('jsonwebtoken')
const bcrpyt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')


// @desc Register User 

// @route   POST /api/user
//@access Public
const registerUser = asyncHandler(async (req,res) => {

    const {name,email,password } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please enter all fields')
    }
    
       
    //Check User
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
     //hash password
    const salt = await bcrpyt.genSalt(10)
    const hashedPassword = await bcrpyt.hash(password,salt)
    
    //Create User
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
    })

    if(user) {
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Ivalid User Data')
    }

 
})

// @desc Login User 

// @route   POST /api/user/login
//@access Public
const loginUser = asyncHandler(async (req,res) => {
    const {email,password } = req.body 
    const user = await User.findOne({email})
    
    if(user && (await bcrpyt.compare(password,user.password)) ) {
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id),

        })
        throw new Error('Invalid Credentials')
    }
    else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }

   
})

// @desc Get user Data

// @route   GET /api/user/me
//@access Private
const getUser = asyncHandler(async (req, res) => {

    const { _id ,name, email } = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email,
    })

})


//Generate A JWT

const generateToken = (id) => {
    return jwt.sign({ id },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d',
    })
}

module.exports= {
     registerUser,
     loginUser,
     getUser
}