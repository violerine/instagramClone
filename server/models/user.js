const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    nama:{type:String,required:true},
    username : {type:String,unique:true,maxlength:10, required:true},
    password : {type:String,required:true}
})

const User = mongoose.model('user',userSchema)

module.exports=User