const express = require("express")
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const router = express.Router()


// AFtr logged in i.e has a TOKEN / cookie -> can access this route
router.post("/create", async (req,res)=>{
    // console.log(req.body);
    // console.log(req.cookies);
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET)    // if wrong token it throws error and goes to catch block
        console.log(decodeToken);
        const userId = decodeToken.id;  
        
        // const currUser = await userModel.findById(userId);   /* gives the complete user object based on the id number provided */
        const currUser = await userModel.findOne({
            _id: userId
        });
        if(!currUser){
            return res.status(404).json({message:"User not found"})
        }
        console.log(currUser);
    }
    catch(err){
        return res.status(401).json({message:"Invalid Token"})
    }
    
    
    res.json({message:"Post created successfully", 
            cookie: req.cookies.token})
})

module.exports = router;