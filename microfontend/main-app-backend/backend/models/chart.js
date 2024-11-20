const mongoose = require('mongoose');
const chartSchema = mongoose.Schema({
    id: String,
    tableName: String,
    axisX: String,
    axisY: String,
    labelX: String,
    labelY: String,
    chartName: String,
    selectedItem: String,
    database: String
  },{ versionKey: false });
  const chart =mongoose.model("Chart",chartSchema);
module.exports = chart ;
  