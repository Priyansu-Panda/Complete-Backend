const {ImageKit} = require("@imagekit/nodejs")


const ImageKitClient = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

async function uploadFile(file){
    const result = await ImageKitClient.files.upload({
        file: file.buffer.toString("base64"),
        fileName: "music_"+Date.now(),
        folder:"yt-Backend/music"
    })
    // file.originalname || 
    return result;
}

module.exports = {uploadFile}

