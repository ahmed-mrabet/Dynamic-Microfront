const mongoose = require('mongoose');
//user schema (attributes)
const userSchema = mongoose.Schema({
    id: String,
    username :String,
    email : String,
    firstName: String,
    lastName: String,
    role: String
   

}, { versionKey: false },{ _id : false }) ;
userSchema.set('primaryKey','id');
const user =mongoose.model("User",userSchema);
module.exports = user ;