const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
},
{
    Timestamp:true
}
);

module.exports = mongoose.model("Book", bookSchema);