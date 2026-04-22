const musicModel = require("../models/music.models.js")
const {uploadFile} = require("../services/storage.service.js")
const jwt = require("jsonwebtoken");
const albumModel = require("../models/album.model.js")

async function createMusic(req,res){

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
        artist: req.user.id
    })
    return res.status(201).json({
        message: "Music created successfully",
        music
    })
}


async function createAlbum(req,res){
    
    const { title, musics } = req.body;
    const album = await albumModel.create({
        title,
        musics: musics,
        artist: req.user.id
    })
    res.status(201).json({
        message: "Album created successfully",
        album
    })
}

async function getAllMusics(req,res){
    try{
        const musics = await musicModel
            .find()
            .skip(0)
            .limit(20)
            .populate("artist", "username email")
        return res.status(200).json({
            message: "All musics fetched successfully",
            musics
        })
    }
    catch(e){
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

async function getAllAlbums(req,res){
    // const albums = await albumModel.find().populate("artist", "username email").populate("musics", "title");
    const albums = await albumModel.find().select("title artist").populate("artist", "username email");

    // const albums = await albumModel.find().select("title artist").populate("artist", "username email").populate("musics", "title");
    // const musics = await musicModel.find().populate("artist", "username email");
    return res.status(200).json({
        message: "All albums fetched successfully",
        albums
        // musics
    })
}

async function getAlbumById(req,res){
    // const {albumId} = req.params;
    const albumId = req.params.albumId;

    try {
        const album = await albumModel.findById(albumId).populate("artist", "username email").populate("musics", "title")
        if(!album){
            return res.status(404).json({
                message: "Album not found"
            })
        }
        return res.status(200).json({
            message: "Album fetched successfully",
            album
        })
    } catch (e) {
        return res.status(500).json({
            message: "Error fetching album",
            error: e
        })
    }
}

module.exports = {createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById}


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