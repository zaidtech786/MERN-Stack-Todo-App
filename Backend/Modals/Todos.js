const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
   title:{
    type:String,
    required:true
   },
   desc:{
    type:String,
    required:true
   },
   status:{
    type:String,
    default:"pending"
   },
})

const TodoModal = new mongoose.model("Todo" , TodoSchema)
module.exports = TodoModal