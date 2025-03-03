
import dotenv from 'dotenv'
dotenv.config();
import cloudinary from 'cloudinary';

const connectCloudinary = async () => {

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECERET
    })

}

export default connectCloudinary;