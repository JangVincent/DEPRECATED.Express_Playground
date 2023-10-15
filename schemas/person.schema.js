let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const personSchema = new Schema({
  name: String,
  age: Number,
  email : {type : String, required : true},
});

module.exports = mongoose.model("Person", personSchema);