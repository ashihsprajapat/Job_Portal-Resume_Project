

import express from 'express';
import { ChangeJobApplicationsStatus, changeVisibility, getCompanyData, getCompanyPostedJobs, getCompayApplicents, loginCompany, postJob, registerCompany } from '../Controller/Company.Controller.js';
import upload from '../Config/multer.js';
import { protectCompay } from '../middleware/auth.middleware.js';
const Router = express.Router();


//register a compay
Router.route("/register")
    .post( upload.single('image'), registerCompany)


//login

Router.route("/login")
    .post(loginCompany)

//get company data
Router.route("/company")
    .get(protectCompay,getCompanyData)

//post a job
Router.route("/post-job")
    .post( protectCompay, postJob);

//get applicants data 
Router.route("/applicants")
    .get(protectCompay,getCompayApplicents)


// get company jobs list
Router.route("/lsit-job")
    .get(protectCompay,getCompanyPostedJobs)


//change application status
Router.route("/change-status")
    .post(protectCompay,ChangeJobApplicationsStatus)

//change job visibility
Router.route("/change-visibilty")
    .post(protectCompay,changeVisibility)


export default Router;