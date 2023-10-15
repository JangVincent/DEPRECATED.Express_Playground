let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const personSchema = new Schema({
  name: String,
  age: Number,
  email : {type : String, required : true},
}, {
});

// Person 은 단수형, people 은 복수형이므로 people 이라는 collection 이 생성됨
// Mongoose 는 model 을 만들 때, model 이름을 소문자로 만들고 복수형으로 만든다.
module.exports = mongoose.model("person", personSchema);