const musicModel = require("../models/music.models.js")
const {uploadFile} = require("../services/storage.service.js")
const jwt = require("jsonwebtoken");
const albumModel = require("../models/album.model.js")

async function createMusic(req,res){
    try{
        /*
            We have to keep it protected, i.e  
            Only to be Accesed by Artists
            ROLE - found by JWT token - contains role + id
        */

        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                message : " Kya be NAlle Pehele Login kar , U Dont have the token !!"
            })
        }

        // U are Logged in, Now lets check Whats ur role ??
        let decodedToken;
        try{    // JWT.verify may throw error if inncorect token or expired token
            decodedToken = jwt.verify(token, process.env.JWT_SECRET)      // if correct token we get eh data 

            if(decodedToken.role !== "artist"){
                return res.status(403).json({
                    message: "You are not authorized to create music"
                })
            }
        }catch(e){
            console.log("Token Verification Error: ", e);
            return res.status(401).json({
                message: "Invalid Token" 
            })
        }

        const {title, uri} = req.body;

        const file = req.file;

        const result = await uploadFile(file)

        // console.log(file)
        // console.log(file.buffer)
        // console.log(file.buffer.toString("base64"))
        // console.log(result)

        const music = await musicModel.create({
            title,
            uri: result.url,
            artist: decodedToken.id
        })
        return res.status(201).json({
            message: "Music created successfully",
            music
        })



    }catch(e){
        console.log("Error in creating music ", e);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


async function createAlbum(req,res){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({ 
            message: "Unauthorized i.e Token not found"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role !== "artist"){
            return res.status(403).json({
                message: "You are not authorized to create album"
            })
        }
        const { title, musics } = req.body;
        const album = await albumModel.create({
            title,
            musics: musics,
            artist: decoded.id
        })
        res.status(201).json({
            message: "Album created successfully",
            album
        })
        
    }catch(e){
        return res.status(401).json({
            message: "Internal Server Error of Create Album Music"
        })        
    }
}

module.exports = {createMusic, createAlbum}


/*
result : 
{
  fileId: '69e794905c7cd75eb8e538e3',
  name: 'music_1776784527151_ztLmegk8J',
  size: 4425351,
  versionInfo: { id: '69e794905c7cd75eb8e538e3', name: 'Version 1' },
  filePath: '/yt-Backend/music/music_1776784527151_ztLmegk8J',
  url: 'https://ik.imagekit.io/kanpri96/yt-Backend/music/music_1776784527151_ztLmegk8J',
  audioCodec: 'mp3',
  fileType: 'non-image',
  AITags: null,
  description: null
}

file: 
{
  fieldname: 'music',
  originalname: 'lightbeatsmusic-joyful-rhythm-walk-funk-513936.mp3',
  encoding: '7bit',
  mimetype: 'audio/mpeg',
  buffer: <Buffer ff fb d0 64 00 04 f6 f7 7d c4 93 18 60 00 67 2f f7 c0 00 2f f6 15 e5 f9 13 2d 8d 99 ca 83 c0 1f 80 13 63 d8 05 05 a4 4e 38 48 68 8e d8 26 04 c0 98 13 ... 4425301 more bytes>,        
  size: 4425351
}
*/