const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  message: { type: String, required: true, maxLength: 100 },
  posted_date: { type: Date },
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);