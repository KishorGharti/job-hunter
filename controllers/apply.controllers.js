import application from "../models/application.models.js";
import job from "../models/job.models.js";


export const applyJob = async(req,res,next)=>{
    try{
        const {jobId} = req.params;

        const check = await  job.findById(jobId);
        if(!check){
            return res.status(500).json({status:false,message:"Job not found"})
        }

        if(req.user.role=='admin'){
            return res.status(500).json({
                status:false,
                message:'Admin cannot apply for job'
            })

        }
        const existingApplication = await application.findOne({
            userId: req.user.userId,
            jobId: jobId            
        })

        if (existingApplication) {
        return res.status(400).json({
            success: false,
            message: "You have already applied for this job"
        });
        }
        const Application = await application.create({
            userId: req.user.userId,
            jobId: jobId
        });

        return res.status(201).json({
            success: true,
            message: "Applied successfully",
            application
        });

    } catch (err) {
        next(err);
    }
    };
    
