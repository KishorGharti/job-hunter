import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
    },

    password:{
        type:String,
        required:true,
    },

    phone:{
        type:String,
        required:true,
        unique:true,
    },

    resume: {
        type: String,
        
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    otp: {
        type: String
    },

    otpExpire: {
        type: Date
    },

    role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
},{timestamps:true});
export default mongoose.model('User',userSchema)
