const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const route = require("./Routes/authRoutes");
const { default: mongoose } = require("mongoose");

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req , res)=>{
    res.status(200).send("api is working ");
   
    
})

app.use("/app" , route) ;


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("mongodb is sucessfully connected");
    
}).catch(()=>{
    console.log("connection failed");
    
})

app.listen(PORT , ()=>{
    console.log(`app is running on ${PORT}`);
    
});

