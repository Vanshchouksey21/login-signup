const mongooose = require("mongoose")
const jwt = require("jsonwebtoken")



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

});


userSchema.methods.genrate = async function(){
    try {
        return jwt.sign({
            userid : this._id.toString(),
            email : this.email,
            isAdmin : this.isAdmin

        },
        process.env.TOKEN ,{
            expiresIn: "1d",
        }
    )
    } catch (error) {
         console.error(error);
    }
}

const User = mongooose.model("User" , userSchema);



module.exports  = User ; ;