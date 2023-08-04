require('dotenv').config();

const Message = require("./models/message");

// Getting date format
const monthMap = {
0: "Jan",
1: "Feb",
2: "Mar",
3: "April",
4: "May",
5: "June",
6: "July",
7: "Aug",
8: "Sep",
9: "Oct",
10: "Nov",
11: "Dec",
}

let dateObj = new Date()
let day = dateObj.getUTCDate()
let month = monthMap[dateObj.getMonth()]
let year = dateObj.getFullYear()
let newdate = month + " " + day + ", " + year

const messages = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = `mongodb+srv://anthonygheinrichs:${process.env.MYDBPASS}@messages.fdusgzz.mongodb.net/?retryWrites=true&w=majority`;

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createMessage();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// Create new message and post to database
async function messageCreate(index, name, message, date) {
  const messagedetail = { name: name, message: message, posted_date: date };

  const fullMessage = new Message(messagedetail);

  await fullMessage.save();
  messages[index] = fullMessage;
  console.log(`Added message for ${name}: ${message} at ${date}`);
}

async function createMessage() {
  console.log("Adding messages");
  await Promise.all([
      messageCreate("Patrick", "What's going on!", newdate),
  ]);
}
  