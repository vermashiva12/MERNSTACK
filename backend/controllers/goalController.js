const asyncHandler = require('express-async-handler')

// @desc Get Goals 

// @route   GET /api/goals
//@access Private

const getGoals = asyncHandler(async (req,res ) => {
    res.status(200).json({ message: 'Get Goals'})
})

// @desc Set Goals 

// @route   SET /api/goals
//@access Private

const setGoals = asyncHandler(async (req,res ) => {
        if(!req.body.text) {
            res.status(400)
            throw new Error("Please Enter Text")
        }

    res.status(200).json({  message: 'Set Goals' })})


// @desc Update Goals 

// @route   PUT /api/goals/id
//@access Private

const updateGoals =  asyncHandler(async (req,res ) => {
    res.status(200).json({  message: `Update Goals ${req.params.id}` })})


// @desc Delete Goals 

// @route   DELETE /api/goals
//@access Private

const deleteGoals = asyncHandler(async (req,res ) => {
    res.status(200).json({  message: `Delete Goals ${req.params.id}` })})



module.exports = {
    getGoals, setGoals, updateGoals, deleteGoals
}