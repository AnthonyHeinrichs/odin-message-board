require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const mongoDB = `mongodb+srv://anthonygheinrichs:${process.env.MYDBPASS}@messages.fdusgzz.mongodb.net/?retryWrites=true&w=majority`;
const Message = require("../models/message");
const addMessageToDB = require("../controllers/messageController")

/* GET home page. */
router.get('/', async function (req, res) {
  await mongoose.connect(mongoDB)
    .catch((err) => console.error('Error connecting to db', err));
  await Message.find().then((messages) => {
    res.render('index', { title: 'Odin Message Board', messages: messages});
  })
  mongoose.connection.close();
});

router.post('/', async function (req, res) {
  addMessageToDB(req.body.username, req.body.message).catch((err) => console.log(err));
  res.redirect('/')
})

module.exports = router;
