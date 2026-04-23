import User from "../models/user.models.js";
import bcrypt from 'bcrypt'

export const registerController = async(req,res,next)=>{
    try{

        const role =
        email === process.env.ADMIN_EMAIL ? "admin" : "user";
        const{name,email,password,phone}=req.body;

        const existingPhone = await User.findOne({phone});
        if(existingPhone){
            return res.status(500).json({message:'Already user exist'})
        }
        const hashPassword =await bcrypt.hash(password,10);

        const newUser = await User.create({
            name,
            email,
            password:hashPassword,
            phone,
        })

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
    }
    catch(err){
        next(err)
    }
}