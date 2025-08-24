const User = require("./Models/User")
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
        user :{username , email}
    });
    } catch (error) {
        console.error("something went wrong");
        res.status(500).json({
            error:"internal server error"
        })
        
    }

}


module.exports ={
    signup
}


