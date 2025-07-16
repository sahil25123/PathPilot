import User from "../models/User.js";

const clerkWebhooks = async (req , res) =>
{
    console.log("Web Hooks Called");

    const event = req.body ;

    try {
        if(event.type = "user.created"){

            const { id, email_addresses, first_name, last_name, image_url } = event.data; 

           const user = new User ({
            cleridId : id,
            email:email_addresses[0].email_address,
            firstName: first_name,
            lastName: last_name,
            imageUrl: image_url,
           })

           const newUser = await User.save();

           return res.status(200).json({message :"User Saved to DB"});
        }
    }
    catch(e){
        console.log("Error Occured in the Webhooks" ,e);
        return res.status(500).json({message:"Error in the WebHook User Creation"})
    }

}