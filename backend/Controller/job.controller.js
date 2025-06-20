import Job from "../models/Job.js"

//route to get all jobs
export const getJob = async (req, res) => {
    try {
        const allJobs = await Job.find({ visible: true }).populate({ path: 'companyId', select: "-password" })
        //console.log(allJobs);

        res.json({ success: true, allJobs });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}



//route to get a single job by id
export const getJobById = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id).populate({ path: "companyId", select: '-password' })
        if (!job)
            return res.json({ success: false, message: " job not found" })

        res.json({ success: true, message: "job", job })

    } catch (err) {
        res.json({ success: false, message: err.message })
    }
}