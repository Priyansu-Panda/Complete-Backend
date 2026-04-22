const jwt = require("jsonwebtoken")

async function authArtist(req,res,next){

    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized i.e Token not found"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.role !== "artist"){
            return res.status(403).json({
                message: "You are not authorized to create music"
            })
        }
        
        /* new parameter is created in the req, and passed on to next
        * because decoded is need it conatins the id and role and we need the id to identify th id of artist
        */
        req.user = decoded;
        next();

    }
    catch(err){
        console.log("EEROR: ", err);
        return res.status(401).json({
            message: "Error in authenticatoion of artist",
            Error: err
        });        
    }
}

async function authUser(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Unauthorized: No toekn Found"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)   // agar koi error aya, caught it catch block

        // if(decoded.role !== "user"){     // Only users would have acess to music, Artist will be Unauthorised
        
        if(decoded.role !== "user" && decoded.role !== "artist"){
            return res.status(403).json({
                message: "You are not authorized"
            })
        }
        req.user = decoded;
        next();
    }
    catch(err){
        console.log("ERROR: ", err)
        return res.status(401).json({
            message: " Error in authenticatoion of User",
            Error: err
        })
    }
}

module.exports = { authArtist, authUser };
