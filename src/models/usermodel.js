import mongoose from "mongoose";
// import next from "next";



const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Provide the username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Provide the email"],
        unique:true,
    },
    Password:{
        type:String,
        required:[true,"Provide the password"],    
    },
    isVarified:{
        type:Boolean,
        default:false
    },
    role:{
        type:Boolean,
        default:false
    },
    forgetPasswordToken:String,
    forgetPasswordTokenExpiry:Date,
    varifyToken:String,
    varifyTokenExpiry:Date,

},{timestamps:true})

// userSchema.pre("save",async function() {
//     try {
//         if(!this.isModified("Password"))return next()
//              const salt = await bcrypt.genSalt(10);
//              const hashPassword = await bcrypt.hash(password , salt)
//              next();

//     } catch (error) {
        
        
//     }
    
// })

// userSchema.methods.comparePassword=async function (password){

// }
const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;