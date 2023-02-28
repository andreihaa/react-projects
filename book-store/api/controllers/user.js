import User from "../models/User.js";

export const createUser = async (req,res, next ) => {
    const newUser = new User(req.body); 
    try{
        const savedUser = await newUser.save();
        res.status(200).json(savedUser)
    }
    catch(err){ 
        next(err)
    }
}
export const updateUser = async (req,res, next ) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, { new:true })
        res.status(200).json(updatedUser)
    }
    catch(err){
        next(err)
    }
}
export const deleteUser = async (req,res, next ) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }
    catch(err){
        next(err)
    }
}
export const getUser = async (req,res, next ) => {
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }
    catch(err){
        next(err)
    }
}
export const getAllUsers = async (req,res, next ) => {
    // const failed = true;

    // if (failed) return next(createError(401, "you are not authenticated!")); 
    try{
        const users = await User.find()
        res.status(200).json(users)
    }
    catch(err){
        next(err)
    } 
}

export const isAdmin = async (req, res, next) => {
    console.log("Received request to /isAdmin");
    if(req.user.isAdmin){
        res.status(200).json(true);
    }else{
        res.status(200).json(false);
    }
}
