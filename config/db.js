import mongoose from 'mongoose';
import 'dotenv/config'


export const connectDb = async(req,res,next)=>{
    try{
        mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('Connected!'));
}
    catch(err){
        next(err)
    }
    }

