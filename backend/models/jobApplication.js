
import Job from "./Job.js";
import Company from "./Company.js";
import mongoose, { Schema, model } from "mongoose";
import User from './User.js';


const jobApplicationSchema = new Schema({

    userId: { type: String, ref: 'User', required: true },
    compayId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    status: { type: String, default: "pending" },
    date: { type: Number, default: Date.now},

})  

const jobApplication = model("JobApplication", jobApplicationSchema)

export default jobApplication