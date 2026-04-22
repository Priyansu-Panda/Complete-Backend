// const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js")
const bcrypt = require("bcryptjs")

async function registerUser(req,res){
    try{
        const {username, email, password, role="user"} = req.body;

        const isUserExist = await userModel.findOne({
            $or: [{username}, {email}]
        })

        // [{username:"Kan"}, {email:"kan@gmail.com"}]
        
        
        if(isUserExist){
            return res.status(409).json({
                message: "User already exists"
            })
        }

        const hashedPass = await bcrypt.hash(password,10)

        // If user doesnt exist !!
        const user = await userModel.create({
            username,
            email,
            password: hashedPass,
            role
        })

        // const token = JsonWebTokenError.sign({   // OLD
        const token = jwt.sign({
            id: user._id,
            username: user.username,
            role: user.role
        },process.env.JWT_SECRET, {expiresIn: "1d"})    // payload -> [(unique) + (of specific user)]

        res.cookie("token", token)      // setting the token in cookie
        return res.status(201).json({
            message: "User registered successfully",
            token,
            users:{
                id: user._id,
                username: user.username,
                role: user.role,
                password: user.password
            },
            user
        })

    }catch(e){
        console.log("Error in user registration ", e);
    }
}

async function loginUser(req,res){
    try{
        const {username, email, password} = req.body;

        // User will enter either username or email
        const user = await userModel.findOne({
            $or: [
                {username},
                {email}
            ]
        })
        if(!user){
            return res.status(401).json({
                message:"Invalid Credentials - USER not FOUND"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({
                message: "Invalid Credentials - Password not matching"
            })
        }

        // Everything Correct by now i.e correct user
        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET)
        res.cookie("token", token);

        res.status(200).json({
            message: "User logged in successfully",
            token,
            user
        })

    }catch(e){
        console.log("Error in user login ", e);
    }
}

async function logoutUser(req,res){
    try{
        res.clearCookie("token")
        return res.status(200).json({
            message: "User logged out successfully"
        })
    }catch(e){
        console.log("Error in user logout", e)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = { registerUser, loginUser, logoutUser }



/*

    // controller.js
    module.exports = registerUser;
    Why this is limiting: module.exports can only be assigned one value at a time. 
    If you do this, you are saying "this entire file represents exactly one function." 
    If you try to add a loginUser function later and do module.exports = loginUser, 
    it will overwrite the registration function

    U can do :
    module.exports = { registerUser, loginUser, logoutUser };

*/