
import { Webhook } from 'svix'
import User from '../models/User.js'
import { json } from 'express';


//Api controller fun
export const clerkWebhooks = async (req, res) => {
    try {
        //create a svix instance with clerk webhook secret

        const whook = new Webhook(process.env.CLERK_WEBhOOK_SECRET)

        //verify headers

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        })

        //getting data from request body

        const { data, type } = req.body;
        //console.log(data, type)

        //switch case for different events like add update delete
        switch (type) {
            case 'users.created': {

                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: "",

                }

                await User.create(userData);

                res.json({})

                break;
            }
            case 'users.updated': {

                const userData = {
                    email: data.email_address[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url


                }

                await User.findByIdAndUpdate(data.id, userData);

                res.json({})

                break;
            }
            case 'users.deleted': {
                await User.findByIdAndDelete(data._id);

                res.json({})
                break;
            }

            default:
                break;
        }

    } catch (err) {
        console.log(err.message)
        res.json({ success: false, message: "web hooks Error" })
    }
}

