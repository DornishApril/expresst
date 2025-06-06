const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const User = require('../models/userModel');

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

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/users-simple.json`, 'utf-8'),
);

const importData = async () => {
  try {
    await User.create(users);
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETE ALL DATA FROM DB

const deleteData = async () => {
  try {
    await User.deleteMany();
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

// tiddysize = 'F';
// (tiddysize) => {
//   if (tiddysize >= 'D') {
//     return 1;
//   }
// };

// // check_Hotness('C');
