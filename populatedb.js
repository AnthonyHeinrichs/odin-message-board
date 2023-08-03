#! /usr/bin/env node

console.log(
    'This script adds some messages to your database"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Message = require("./models/message");
  
  const datetime = new Date()
  const messages = [];

  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createMessages();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // Creating message data for testing database connection
  async function messageCreate(index, name, message, date) {
    const messagedetail = { name: name, message: message, posted_date: date };
  
    const fullMessage = new Message(messagedetail);
  
    await fullMessage.save();
    messages[index] = fullMessage;
    console.log(`Added message for ${name}: ${message} at ${date}`);
  }
  
  async function createMessages() {
    console.log("Adding messages");
    await Promise.all([
      messageCreate(0, "Patrick", "What's going on!", datetime),
      messageCreate(1, "Ben", "Hello, Patrick!", datetime),
      messageCreate(2, "Isaac", "I'm just saying hello", datetime),
      messageCreate(3, "Bob", "Billings", datetime),
      messageCreate(4, "Jim", "Indiana Jones was a great film", datetime),
    ]);
  }
  