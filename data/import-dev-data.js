const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../models/tourModel');

dotenv.config({ path: './config.env' });

//console.log(app.get('env'));
//console.log(process.env);

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
//console.log(DB);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful');
});
mongoose.set('strictQuery', false);

//READ JSON FILE

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);
const updatedTours = tours.map((tour) => {
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const { id, ...rest } = tour;
  return rest;
});
console.log(tours);
const importData = async () => {
  try {
    await Tour.create(updatedTours);
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETE ALL DATA FROM DB

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully !!DELETE!!');
    process.exit();
  } catch (err) {
    console.log(err.message);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
