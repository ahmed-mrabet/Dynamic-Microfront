const mongoose = require('mongoose');
//connector schema (attributes)
const connectorSchema = mongoose.Schema({
    name :String,
    type : String,
    url: String,
    
   

}, { versionKey: false }) ;

const connector =mongoose.model("Connector",connectorSchema);
module.exports = connector ;