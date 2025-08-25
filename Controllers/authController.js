const User = require("../Models/User")
const bcrypt = require("bcryptjs")

const signup = async(req , res )=>{
    try {
        const {username , email , password} = req.body;
        if(!username || !email || !password){
          return  res.status(400).json({
                msg:" all fields are requires "
            })
        }
        
        const existinguser = await User.findOne({email});
        if(existinguser){
           return res.status(400).json({
                error:"Email already exist"
            })

        }
if (password.length < 6 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
  return res.status(400).json({
    error: "Password must be at least 6 characters, include 1 uppercase letter and 1 number"
  });
}

        const hashpassword = await bcrypt.hash(password , 10)

    const newUser = new User({
      username,
      email,
      password:hashpassword
    });

    await newUser.save();
        
    res.status(200).json({
        msg:"User signed up ",
        token : await newUser.genrate(),  userid : newUser._id.toString(),
    });
    } catch (error) {
        console.error("something went wrong");
        res.status(500).json({
            error:"internal server error"
        })
    
    }
}


const Login = async(req , res) =>{
    const {email , password} = req.body ;
    try {
        const user = await User.findOne({email});
        if(!user){
          return  res.status(200).json({
                error:"invalid user"
            })
        }

        const passmatch = await bcrypt.compare(password , user.password)
        if(!passmatch){
           return res.status(400).json({
                error :"Invalid credentials"
            })
        }

        const token = await user.genrate();
        res.status(200).json({
            msg :"login Sucessfull ",
            token,
            user: {
                id : user._id.toString(),
                email:   user.email,
                isAdmin : user.isAdmin
            }
        })
    } catch (error) {
        console.error(error);
    res.status(500).json({ msg: "Server error" });
    }

}

module.exports ={
    signup,
    Login
}


