const mongoose = require("mongoose")

const albumSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    musics:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "music"
    }],
    artist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

})

const albumModel = mongoose.model("album", albumSchema)

module.exports = albumModel