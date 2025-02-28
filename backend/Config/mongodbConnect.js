

import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const url=process.env.MONGDB_URL

export const connectTOMonogodb = async () => {
    await mongoose.connect(`${url}/job-portal`);
    console.log("Connect to data base ")
}