const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "add username"],
        unique:true,
    },
    email:{
        type:String,
        required:[true, "add email address"],
        unique:true,
    },
    password:{
        type:String,
        required:[true, "add password"],
    },
    role:{
        type:String,
        default:"simple"
    },
    goals:{
        type:Array,
        default:[]
    },

},   
{
    timestamps:true
})

module.exports = mongoose.model("User", userSchema)