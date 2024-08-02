const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    user_id : {type:mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    title: { type: String,required: true },
    completed: { type: Boolean, default:false},
},{
    timestamps:true
})



module.exports = mongoose.model("Todo", todoSchema)
