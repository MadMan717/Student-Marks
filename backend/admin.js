const mongoose=require("mongoose");
const adminschema=new mongoose.Schema({
  username:String,
  password:String
});
const Admin=mongoose.model("Admin", adminschema);
module.exports=Admin;

