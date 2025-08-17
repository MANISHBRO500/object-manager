const mongoose = require("mongoose");

const ObjectItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 }
});

module.exports = mongoose.model("ObjectItem", ObjectItemSchema);
