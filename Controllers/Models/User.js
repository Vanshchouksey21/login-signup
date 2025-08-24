const mongooose = require("mongoose")



const userSchema = new mongooose.Schema({
      username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

})

const User = mongooose.model("User" , userSchema);

module.exports  = User ; ;