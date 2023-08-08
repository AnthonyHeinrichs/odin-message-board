require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const mongoDB = `mongodb+srv://anthonygheinrichs:${process.env.MYDBPASS}@messages.fdusgzz.mongodb.net/?retryWrites=true&w=majority`;
const Message = require("../models/message");

/* GET home page. */
router.get('/', async function (req, res) {
  await mongoose.connect(mongoDB)
    .catch((err) => console.error('Error connecting to db', err));
  await Message.find().then((messages) => {
    const reverseMessages = messages.reverse()
    res.render('index', { title: 'Odin Message Board', messages: reverseMessages});
  })
  mongoose.connection.close();
});

router.post('/', async function (req, res) {
  let date = new Date()
  date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay()
  await mongoose.connect(mongoDB)
  const data = new Message({name: req.body.username, message: req.body.message, posted_date: date})
  try {
    const dataToSave = await data.save();
    res.redirect('/')
  }
  catch (error) {
    res.status(400).json({message: error.message})
  }
  mongoose.connection.close();
})

module.exports = router;
