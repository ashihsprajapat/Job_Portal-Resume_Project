

import mongoose, { Schema } from "mongoose";
import Company from './Company.js';

const jobSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    level: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Number, default:Date.now() },
    salary: { type: Number, required: true },
    visible: { type: Boolean, default: true },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
})


const Job = mongoose.model("Job",jobSchema);

export default Job