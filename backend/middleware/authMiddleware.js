const jwt = require('jsonwebtoken')
const asyncHandler =  require('express-async-handler')

const User = require('../model/userModel')

const protect = asyncHandler(async (req,res,next) => {
    
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
    
        try {
            // Get Token from Header


            token = req.headers.authorization.split(' ')[1]


            //Verify
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            //Get User from Token
            req.user = await User.findById(decoded.id).select('-password')
            next()

            
        } catch (error) 
        {
            console.error(error)
            res.status(401)
            throw new Error('Invalid Token')
            
        }
        
    }   
    if(!token)
    {
        res.status(401)
        throw new Error('No Token Provided')
    }
   


})
module.exports = { protect }