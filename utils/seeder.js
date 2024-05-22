const plants = require("../data/plant.json");
const plant = require("../models/postModel");
const dotenv = require("dotenv");
const connectDatabase = require("../config/db");

dotenv.config({ path: ".env" });
connectDatabase();

const seedPlants = async () => {
  try {
    await plant.deleteMany();
    console.log("plants deleted");
    await plant.insertMany(plants);
    console.log("plants inserted");
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

seedPlants();
