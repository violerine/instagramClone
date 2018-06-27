const Post = require ("../models/post")
const User = require("../models/user")
const images = require ('../helper/gcp')
const Storage = require('@google-cloud/storage');
const storage = new Storage();

module.exports={ 
    getAllPost:(req,res,next)=>{
        Post.find({})
        .sort({createdAt:'desc'})
        .populate('userId')
        .then(posts=>{
            res.json(posts)
        })
        .catch(err=>{
            res.status(400).send(err)
        })
    },

    getPostByPhotoId:(req,res,next)=>{
        Post.findById(req.params.id)
        .populate('userId')
        .then(post=>{
            res.json(post)
        })
        .catch(err=>{
            res.status(400).send(err)
        })
    },

    // getPostByUserId:(req,res,next)=>{
    //     Post.paginate({userId:req.params.userid},{page:req.headers.page, limit:5, sort:{createdAt:'desc'}})
    //     .then(posts=>{
    //         res.json(posts)
    //     })
    //     .catch(err=>{
    //         res.status(400).send(err)
    //     })
    // },

    getPostByUserId:(req,res,next)=>{
        Post.find({userId:req.params.userid})
        .sort({createdAt:'desc'})
        .populate('userId')
        .then(posts=>{
            res.json(posts)
        })
        .catch(err=>{
            res.status(400).send(err)
        })
    },

    addNewPost:(req,res,next)=>{
        let postData = {
            userId:req.body.userid,
            caption: req.body.caption,
            pic_url:req.file.cloudStoragePublicUrl,
        }

        let newPost = new Post(postData)
        console.log(newPost)
        newPost.save()
        .then(post=>{
            res.status(200).send(post)
        })
        .catch(err=>{
            res.status(400).send(err)
        })

    },

    deletePost:(req,res,next)=>{
        Post.findByIdAndRemove(req.params.id)
        .then(post=>{
            var splitPost=post.pic_url.split('/')
            console.log("INI MASUK GA SPLITPOST",splitPost)
            var filename=splitPost[splitPost.length-1]
            res.send("deleted")
            function deleteImage(){
                storage
                .bucket('instastoragebucket')
                .file(filename)
                .delete()
                .then(() => {
                    console.log(`gs://instastoragebucket/${filename} deleted.`);
                })
                .catch(err => {
                    console.error('ERROR:', err);
                });
            }
            deleteImage()
        })
        .catch(err=>{
            res.status(400).send(err)
        })
    }
}
