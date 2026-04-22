const express = require("express")
const authController = require("../controllers/auth.controller")

const router = express.Router();

/* POST /api/auth/register */
router.post("/register", authController.registerUser);

// router.post("/register",(req,res)=>{
//     const { username, email, password } = req.body;

//     if(!username || !email || !password){
//         return res.status(400).json({message:"All fields are required"})
//     }
// })

router.get("/test",(req,res)=>{
    console.log("Cookies: ", req.cookies)
    res.json({
        message:"Cookie received",
        cookie: req.cookies
    })
})


module.exports = router