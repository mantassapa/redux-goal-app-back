const bcrypt = require("bcrypt")
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")

//Register Users
//POST /api/users

const registerUser = asyncHandler(async (req, res)=>{
    const {username, email, password} = req.body;

    if(!username||!email||!password){
        res.status(401);
    }
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(402)
    }
    const usernameExists = await User.findOne({username})
    if(usernameExists){
        res.status(403)
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    if(user){
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            goals: user.goals,
            imp: user.imp,
        });
    }else{
        res.status(405);
    }
})

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(user){
        if(await bcrypt.compare(password, user.password)){
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                goals: user.goals,
                imp: user.imp,
            })
        }else{
            res.status(406)
            throw new Error("ivalid crediancials")
        }
    }else{
        res.status(407)
        throw new Error("ivalid crediancials")
    }
})

const updateUser = asyncHandler(async(req,res)=>{
    const findOne = await User.findByIdAndUpdate(req.params.id, { goals: req.body.goals }, {new: true})
    if(!findOne){
        res.status(407).send("could't update")
    }
    res.status(200).json(findOne)
})
// get all users
const getAllUsers = asyncHandler(async (req, res) => {
    const allUsers = await User.find();
    if (!allUsers) {
      res.status(404).json(allUsers);
      return; 
    }
    res.status(200).json(allUsers);
  });

//delete user
const deleteUser = asyncHandler(async (req,res)=>{
    const findOne = await User.findById(req.params.id)
    if(!findOne){
      res.status(404).send("task not found")
      return
    }
    const theOne = await User.deleteOne({_id: req.params.id})
    res.status(200).json(theOne)
  });

module.exports = {registerUser, loginUser, updateUser, getAllUsers, deleteUser}