const express = require('express')
const router = express.Router()
const controller = require('../controllers/food-controllers')
const images = require('../helper/images')
var multer  = require('multer')

router.get('/',controller.showAll)

router.get('/userphoto/:username',controller.show)
router.get('/photo/:photoid',controller.showPhoto)

router.get('/userphoto/:username',controller.show)
router.get('/photo/:photoid',controller.showPhoto)
router.post('/upload',
images.multer.single('image'),
images.sendUploadToGCS,
controller.upload)

router.delete('/delete/:id',controller.delete)

module.exports = router
