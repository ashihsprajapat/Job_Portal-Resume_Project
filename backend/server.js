
import './Config/instrument.js'
import * as Sentry from "@sentry/node";

import express, { json } from 'express';

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors';
import CompanyRoute from './routes/Company.routes.js'
//rout for jobs
import JobsRoute from './routes/Job.route.js'


import { clerkWebhooks } from './Controller/webHooks.js';



dotenv.config();


const app = express();




app.use(cors());
app.use(express.json())


const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log("App is listing on port", PORT)
})

//connect to databse 
import { connectTOMonogodb } from './Config/mongodbConnect.js';
import connectCloudinary from './Config/cloudinary.js';

//connect to database
await connectTOMonogodb();

//connect to cloudinary 
await connectCloudinary();

app.get("/", (req, res) => {
    //console.log("res")
    return res.json({ message: "ok working" })
})


app.post('/webhooks', clerkWebhooks)

//router for company
app.use('/api/company', CompanyRoute)


//route for jobs

app.use("/api/jobs", JobsRoute)



app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});


