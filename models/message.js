const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  message: { type: String, required: true, maxLength: 100 },
  posted_date: { type: String },
});

// Export model
module.exports = mongoose.model("Message", messageSchema);