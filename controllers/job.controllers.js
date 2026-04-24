import Jobs from "../models/job.models.js";

export const addJob = async(req,res,next)=>{
    try{
        const{title,description,companyName,location,salary}=req.body;

        if(!req.user || !req.user.userId){
            return res.status(401).json({message:'Unathourized Access!!!'})
        }


        const newJobs = new Jobs({
            title,
            description,
            companyName,
            location,
            salary,
            createdBy: req.user.userId
        })

        const job = await newJobs.save();

        res.status(200).json({job})
    }

    catch(err){
    next(err)
    }

}

export const getJob = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, location } = req.query;

    const query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const jobsData = await Jobs.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Jobs.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      jobs: jobsData
    });

  } catch (err) {
    next(err);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const { jobsId } = req.params;

    const job = await Jobs.findById(jobsId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    if (job.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this job"
      });
    }

    const { title, description, companyName, location, salary } = req.body;

    if (title !== undefined) job.title = title;
    if (description !== undefined) job.description = description;
    if (companyName !== undefined) job.companyName = companyName;
    if (location !== undefined) job.location = location;
    if (salary !== undefined) job.salary = salary;

    const updatedJob = await job.save();

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob
    });

  } catch (err) {
    next(err);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const { jobsId } = req.params;

    const job = await Jobs.findById(jobsId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    if (job.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this job"
      });
    }

    await job.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully"
    });

  } catch (err) {
    next(err);
  }
};