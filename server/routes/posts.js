var express = require('express');
var router = express.Router();
const images = require ('../helper/gcp')
var {getPostByUserId,getAllPost,deletePost,addNewPost,getPostByPhotoId}=require ('../controllers/Post-controller.js')

/* GET users listing. */
router.get('/a', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/',getAllPost)
// router.post('/upload',images.multer.single('image'),
// images.sendUploadToGCS,(req,res)=>{
//   res.send({
//     status:200,
//     message:'Your file uploaded',
//     link:req.file.cloudStoragePublicUrl
//   }) 
// })
router.get('/:userid',getPostByUserId)
router.post('/add',images.multer.single('image'),images.sendUploadToGCS,addNewPost)
router.delete('/delete/:id',deletePost)
router.get('/one/:id',getPostByPhotoId)
module.exports = router;
