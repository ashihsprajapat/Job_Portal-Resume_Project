
import mongoose,{Schema} from "mongoose";

const userSchema= new Schema({
    name:{type:String , required:true},
    _id:{type:String, required:true},
    email:{type:String, required:true},
    resume:{type:String},
    image:{type:String, required:true}
})

const User= mongoose.model("User", userSchema);

export default User;