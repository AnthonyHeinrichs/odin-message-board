const express = require('express');
const router = express.Router();

const year = new Date().getFullYear();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Odin Message Board', message: "User name", year: year});
});

module.exports = router;
