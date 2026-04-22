const express = require("express")
const router = express.Router()
const musicController = require("../controllers/music.controller.js")
const multer = require("multer")
const authMiddleware = require("../middlewares/auth.middleware.js")

const upload = multer({
    storage: multer.memoryStorage()
})

/* Find  coode snippet in copy version, this is w/o middleware */
// router.post("/upload", upload.single("music"), musicController.createMusic)
// router.post("/album", musicController.createAlbum)

router.post("/upload", authMiddleware.authArtist, upload.single("music"), musicController.createMusic)
router.post("/album", authMiddleware.authArtist, musicController.createAlbum)

router.get("/", authMiddleware.authUser, musicController.getAllMusics)
router.get("/albums", authMiddleware.authUser, musicController.getAllAlbums)
router.get("/albums/:albumId", authMiddleware.authUser, musicController.getAlbumById)

module.exports = router