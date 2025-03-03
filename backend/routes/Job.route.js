
import express from 'express';
import { getJobById, getJob } from '../Controller/job.controller.js';

const Router = express.Router();


//Route to get all jobs data
Router.route("/")
    .get(getJob)



//route to get a single job by id
Router.route("/:id")
    .get(getJobById)


export default Router;