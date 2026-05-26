const mongoose = require("mongoose");
const watch = require("../Models/watch");
const indata = require("./data.js");

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/watch");
    console.log("Successfully Connected to The Mongoose Server");
  } catch (err) {
    console.log(`Sorry for error ${err}`);
  }
}

main();

const seedDB = async () => {
  await watch.deleteMany({});
  await watch.insertMany(indata.data);
  console.log("Data was Initialized Successfully");
};

seedDB();