
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken';

import Company from '../models/Company.js';

export const protectCompay = async (req, res, next) => {
    const token = req.headers.token

    if (!token) {
        return res.json({ success: false, message: 'not autherize login' })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        //console.log(decode);

        req.Company = await Company.findById(decode.id).select('-password')

        next();

    } catch (err) {
        console.log(err)
        res.jsonf({ success: false, message: err.message });
    }
}