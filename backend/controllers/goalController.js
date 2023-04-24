const asyncHandler = require('express-async-handler')

const Goal = require('../model/goalmodel')
const User = require('../model/userModel')



// @desc Get Goals 

// @route   GET /api/goals
//@access Private

const getGoals = asyncHandler(async (req,res ) => {
        const Goals = await Goal.find({ 
            user: req.user.id
         })

    res.status(200).json(Goals)
})

// @desc Set Goals 

// @route   SET /api/goals
//@access Private

const setGoals = asyncHandler(async (req,res ) => {
        if(!req.body.text) {
            res.status(400)
            throw new Error("Please Enter Text")
        }

        const goal = await Goal.create({
            text: req.body.text,
            user: req.user.id,

        })

    res.status(200).json(goal)
})


// @desc Update Goals 

// @route   PUT /api/goals/id
//@access Private

const updateGoals =  asyncHandler(async (req,res ) => {

    const goal = await Goal.findById(req.params.id)
    
    if(!goal) {
        res.status(400)
        throw new Error("Goal Not Found")
    }
    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401)
        throw new Error("User Not Found")
    }
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error("User Not Authorized")

    }
    const update = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(goal)})


// @desc Delete Goals 

// @route   DELETE /api/goals
//@access Private

const deleteGoals = asyncHandler(async (req,res ) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error("Goal Not Found")
    }
    
    if(!req.user) {
        res.status(401)
        throw new Error("User Not Found")
    }
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("User Not Authorized")

    }
    const deleteGoal = await Goal.findByIdAndDelete(req.params.id,req.body, {
        new: true,
    })
   
    res.status(200).json(goal)})



module.exports = {
    getGoals, setGoals, updateGoals, deleteGoals
}