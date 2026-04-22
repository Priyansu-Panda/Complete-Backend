const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");

async function registerUser(req,res){
    try{
        const {username,email,password} = req.body

        const userExists = await userModel.findOne({email})     // if found returns the query else null
        // $or: [{ email: email }, { username: username }]

        if(userExists){
            return res.status(409).json({message:"User already exists"})
        }

        const user = await userModel.create({
            username,
            email,
            password
        })

        // jwt needs something which is always unique 
        // and every user has a unique _id
        const token = jwt.sign({
            id: user._id        // payload
        },process.env.JWT_SECRET,{expiresIn:"1h"})    // jwt.sign() -> it would create the token
        

        /* storing token in cookie and sending it back to the user as a response from the server */
        res.cookie("token",token,{httpOnly:true,
                                secure:true,
                                sameSite:"strict",
                                maxAge:60*60*1000
        })

        return res.status(201).json({message:"User created successfully",
                                    user,
                                    token,
                                    cookie:req.cookies})        // here, req.cookies -> old cokkie if present will be printed else its usually blank
    }
    catch(err){
        console.log(err)
    }
}

module.exports={registerUser}