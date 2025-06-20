
import './Config/instrument.js'
import * as Sentry from "@sentry/node";

import express, { json } from 'express';
import dotenv from 'dotenv'
import cors from 'cors';


import { clerkMiddleware } from '@clerk/express'  //clerk middlware 
import { requireAuth } from '@clerk/express'


import CompanyRoute from './routes/Company.routes.js' // company route imported

import JobsRoute from './routes/Job.route.js' //job route imported

import userRoutes from './routes/user.routes.js' // user route imported

import { clerkWebhooks } from './Controller/webHooks.js';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';


dotenv.config();


const app = express();




app.use(cors());
app.use(express.json())
app.use(clerkMiddleware())
app.use(ClerkExpressWithAuth());


//app.use(requireAuth())

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

app.use( "/", clerkMiddleware());

app.post('/webhooks', clerkWebhooks)

//router for company
app.use('/api/company', CompanyRoute)


//route for jobs

app.use("/api/jobs", JobsRoute)


//router for user
app.use('/api/user', userRoutes)


app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});


