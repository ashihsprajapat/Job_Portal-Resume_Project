
import Company from "../models/Company.js";
import upload from "../Config/multer.js";
import bcrypt, { hash } from 'bcrypt';
import generatToken from './../utils/generateToken.js';
import cloudinary from 'cloudinary'
import Job from './../models/Job.js';


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

        console.log(err)
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

//get company data

export const getCompanyData = async (req, res) => {

}

//post a new job

export const postJob = async (req, res) => {

    const { title, description, location, salary,level,category } = req.body;

    const companyId = req.Company._id;

    try {

        const newJob = new Job({
            title, description, location, salary,
            companyId: companyId,
            date: Date.now(),
            level,category

        })

        await newJob.save()

        res.json({success:true, message:newJob})

    } catch (err) {
        res.json({success:false, message:err.message});
    }

}


//get Company job application

export const getCompayApplicents = async (req, res) => {



}

//get compay posted jobs

export const getCompanyPostedJobs = async (req, res) => {

}

//change job application status

export const ChangeJobApplicationsStatus = async (req, res) => {

}

//change job visibility

export const changeVisibility = async (req, res) => {

}