require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const mongoDB = `mongodb+srv://anthonygheinrichs:${process.env.MYDBPASS}@messages.fdusgzz.mongodb.net/?retryWrites=true&w=majority`;
const Message = require("../models/message");

/* GET home page. */
router.get('/', async function (req, res, next) {
  await mongoose.connect(mongoDB)
    .catch((err) => console.error('Error connecting to db', err));
  await Message.find().then((messages) => {
    res.render('index', { title: 'Odin Message Board', messages: messages});
  })
  mongoose.connection.close();
});

module.exports = router;
