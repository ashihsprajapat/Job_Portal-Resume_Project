
import Company from "../models/Company.js";
import upload from "../Config/multer.js";
import bcrypt, { hash } from 'bcrypt';
import generatToken from './../utils/generateToken.js';
import cloudinary from 'cloudinary'
import Job from './../models/Job.js';
import User from './../models/User.js';
import jobApplication from './../models/jobApplication.js';


// Register a new company

export const registerCompany = async (req, res) => {

    const { name, password, email } = req.body;

    const imageFile = req.file;
    // console.log(imageFile)

    if (!name || !password || !email || !imageFile) {
        return res.json({ success: false, message: "missing details" });
    }

    try {

        const companyExist = await Company.findOne({ email });
        if (companyExist) {
            return res.json({ success: false, message: "email already exist" })
        }

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        const hashPassword = await bcrypt.hash(password, 10);

        const newCompany = new Company({
            password: hashPassword,
            name: name,
            email: email,
            image: imageUpload.secure_url,
        })

        await newCompany.save();

        res.json({
            success: true,
            message: "register successfull",
            company: {
                _id: newCompany._id,
                name: newCompany.name,
                email: newCompany.email,
                image: newCompany.image
            },
            token: generatToken(newCompany._id)
        });

    } catch (err) {


        res.json({ success: false, message: err.message })

    }

}



// Company login 

export const loginCompany = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password)
        return res.json({ success: false, message: " missing details" })

    try {

        const company = await Company.findOne({ email })

        if (!company)
            return res.json({ success: false, message: "not exist email" })

        const match = await bcrypt.compare(password, company.password)

        if (!match) {
            return res.json({ success: false, message: "wrong password" })
        }

        res.json({
            success: true,
            message: "login",
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generatToken(company._id),

        })


    } catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message });

    }




}

// //log-out company
// export const logout=async(req,res)=>{
//     try{

//     }catch(err){
        
//     }
// }

//get company data

export const getCompanyData = async (req, res) => {

    try {
        const Company = req.Company;
        res.json({ success: true, Company })

    } catch (err) {
        res.json({ success: false, message: err.message })
    }

}

//post a new job

export const postJob = async (req, res) => {

    const { title, description, location, salary, level, category } = req.body;

    const companyId = req.Company._id;

    try {

        const newJob = new Job({
            title, description, location, salary,
            companyId: companyId,
            date: Date.now(),
            level, category

        })

        await newJob.save()

        res.json({ success: true, message: "job posted", newJob })

    } catch (err) {
        res.json({ success: false, message: err.message });
    }

}


//get Company job application

export const getCompayApplicents = async (req, res) => {

    try{
        const companyId= req.Company.id;
        const allApplicatnts= await jobApplication.find({compayId});
        console.log(allApplicatnts);

        if(!allApplicatnts){
            return res.json({success:false, message:"no applicants"})
        }
        res.json({success:true, allApplicatnts});

    }catch(err){

    }


}

//get compay posted jobs

export const getCompanyPostedJobs = async (req, res) => {
    const Company = req.Company;
    try {

        const jobs = await Job.find({ companyId: Company._id });
        if (!jobs)
            return res.json({ success: false, message: "not jobs postesd" })

        //adding no of applicants info in data

        const jobsData = await Promise.all(jobs.map(async (job) => {
            const applicants = await jobApplication.find({ jobId: job._id })
            return { ...job.toObject(), applicants: applicants.length }
        }))
        res.json({ success: true, jobsData })

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}

//change job application status

export const ChangeJobApplicationsStatus = async (req, res) => {

}

//change job visibility

export const changeVisibility = async (req, res) => {
    try {
        const companyId = req.Company._id;
        const { id } = req.body;

        const job = await Job.findById(id);

        if (companyId.toString() !== job.companyId.toString()) {
            res.json({ success: false, message: "Not you are onwer of this jobs" });
        }

        job.visible = !job.visible

        await job.save();
        res.json({ success: true, message: "visible change", job });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}