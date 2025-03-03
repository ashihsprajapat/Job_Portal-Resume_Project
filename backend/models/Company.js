
import mongoose, { Schema } from 'mongoose';

const companySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    image: { type: String, required: true },
    password: { type: String, required: true },
    // password:{type:String, required:true},
})


const Company = mongoose.model("Company", companySchema);


export default Company;