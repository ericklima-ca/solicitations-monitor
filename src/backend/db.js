const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;

const conn = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("DB connected!");
  } catch (e) {
    console.log(`DB not connected. Error: ${e}`);
  }
};

module.exports = conn;
