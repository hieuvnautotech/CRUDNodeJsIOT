const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const IOTdb = mongoose.model("iotdb", schema);

module.exports = IOTdb;
