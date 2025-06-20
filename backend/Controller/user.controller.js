import Job from "../models/Job.js";
import jobApplication from "../models/jobApplication.js";


import { clerkClient, requireAuth, getAuth } from '@clerk/express'
import User from "../models/User.js";
import cloudinary from 'cloudinary';

import { clerkMiddleware } from '@clerk/express'  //clerk middlware 


//get user Data
export const getUserData = async (req, res) => {

    //clerkMiddleware();

    console.log(req.body)

    const { userId } = getAuth(req);
    
    console.log("userId from token:", userId);

    try {
       // const user = await User.findById(userId);
        const user =  await clerkClient.users.getUser(userId)
        console.log("user fond is ", user)

        if (!user)
            return res.json({ success: false, message: "user not found" })

        res.json({ success: true, user })

    } catch (err) {
        res.json({ success: false, message: err.message })
    }

}


//apply  for jobs
export const applyForJob = async (req, res) => {
    const { jobId } = req.body;
    const userId = req.auth.userId;

    try {

        const isAlreadyApplied = await jobApplication.find({ jobId, userId })
        if (isAlreadyApplied.length > 0)
            return res.json({ success: false, message: "you already applied for this jobs" })

        const jobData = await Job.findById(jobId);
        if (!jobsData)
            return res.json({ success: false, message: " job not found" })

        const newJobApplied = new jobApplication({
            userId, jobId, compayId: jobData.companyId,
            date: Date.now(),
        })
        await newJobApplied.save()

        res.json({ success: false, message: "applied successfull", newJobApplied });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}


// get user applied application
export const getUserJobAppliedJobs = async (req, res) => {
    try {

        const userId = req.auth.userId;

        const appliedJobs = await jobApplication.find({ userId })
            .populate('companyId', 'name', 'email', 'image')
            .populate('jobId', 'title', 'description location category level salary')
            .exec()

        if (!appliedJobs)
            return res.json({ success: false, message: "no one job applied" })

        res.json({ success: true, appliedJobs });

    } catch (err) {
        res.json({ success: false, message: err.message })
    }

}

//update user  profile (resume)
export const updateUserResume = async (req, res) => {

    try {
        const userId = req.auth.userId;

        const resumeFile = req.resumefile;
        const userData = await User.findById(userId);

        if (resumeFile) {
            const reumeUpload = await cloudinary.uploader.upload(resumeFile.path)

            userData.resume = reumeUpload.secure_url;

        }

        await userData.save();

        return res.json({ success: true, message: "resume uploade" })


    } catch (err) {
        res.json({ success: false, message: err.message });
    }

}