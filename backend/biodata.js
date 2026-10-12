const mongoose=require("mongoose");
const bioSchema=new mongoose.Schema({
    rollNo:String,
    name:String,
    email:String,
    grade:String
});

const Biodata=mongoose.model("Biodata",bioSchema);
module.exports=Biodata;