
import express from 'express';
import { protectCompay } from '../middleware/auth.middleware.js';
import { applyForJob, getUserData, getUserJobAppliedJobs, updateUserResume } from '../Controller/user.controller.js';
import upload from './../Config/multer.js';
const Router = express.Router();


//get user data
Router.route("/user")
    .get(  getUserData)


// apply for job
Router.route('/apply')
    .post(applyForJob)

//appled job by user
Router.route('/applied-jobs')
    .get(getUserJobAppliedJobs)



// upload reume
Router.route("/update-resume")
    .post(upload.single('resume'), updateUserResume)

export default Router;