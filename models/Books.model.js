const mongoose= require('mongoose');
const Bookschema=mongoose.Schema({
    title:String,
    author:String,
    addedAt:{
        type:Date,
        default:Date.now()
    },
    addedBy:String
},{
    versionKey:false
})

const BookModel=mongoose.model("book",Bookschema);
module.exports={
    BookModel
}
