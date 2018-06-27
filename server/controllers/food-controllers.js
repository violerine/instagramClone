const Model = require('../models/food-model')
const images = require('../helper/images')

class Controller {
    static showAll(req,res){
        Model.find()
        .then(foods=>{
            res.status(200).json({
                message : "menampilkan semua makanan",
                foods
            })
        })
        .catch(err=>{
            res.status(400).json({
                message: err.message
            })
        })
    }
    static show(req,res){
        Model.find({username: req.params.username})
        .then(dataFood=>{
            res.status(200).json({
                message: `menampilkan food berdasarkan user`,
                dataFood
            })
        })
        .catch(err=>{
            res.status(400).json({
                message: err.message
            })
        })
    }
    static showPhoto(req,res){
        console.log('masuk gak?')
        Model.findOne({_id: req.params.photoid})
        .then(dataFood=>{
            res.status(200).json({
                message: `menampilkan foto dengan id ${dataFood._id}`,
                dataFood
            })
        })
        .catch(err=>{
            res.status(200).json({
                message: err.message
            })
        })
    }

    static upload(req,res){
        console.log("REQ FILE",req.file)
        let data = {
            name: req.body.name,
            desc: req.body.desc,
            location: req.body.location,
            url : req.file.cloudStoragePublicUrl,
            username: req.body.username
        }

        let newUpload = new Model(data)
        newUpload.save()
        .then(dataFood=>{
            res.status(200).json({
                message: 'data berhasil masuk',
                dataFood
            })
        })
        .catch(err=>{
            console.log("ERRORNYA",err)
        })
    }
    static delete(req,res){
        Model.findByIdAndRemove(req.params.id)
        .then(()=>{
            res.status(200).json({
                message: 'deleted photo'
            })
        })
    }
}

module.exports = Controller
