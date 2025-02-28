
import './Config/instrument.js'
import * as Sentry from "@sentry/node";

import express, { json } from 'express';

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors';


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

await connectTOMonogodb();

app.get("/", (req, res) => {
    //console.log("res")
    return res.json({ message: "ok working" })
})


app.post('/webhooks', clerkWebhooks)

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});
