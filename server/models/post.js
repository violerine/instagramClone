const mongoose = require("mongoose")
const Schema = mongoose.Schema
var timestamps = require('mongoose-timestamp')
var mongoosePaginate = require('mongoose-paginate');

const postSchema = new Schema({
    userId: {type:Schema.Types.ObjectId, ref:'user'},
    caption:{type:String,required:true},
    pic_url:{type:String,required:true},
    likes:0
})

postSchema.plugin(mongoosePaginate);
postSchema.plugin(timestamps)

mongoose.model('article',postSchema)

const article = mongoose.model('posts',postSchema)

module.exports=article