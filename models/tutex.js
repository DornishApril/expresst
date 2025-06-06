const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');

dotenv.config({ path: './config.env' });

//console.log(app.get('env'));
//console.log(process.env);

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
//console.log(DB);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful');
});
mongoose.set('strictQuery', false);

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});

const User = mongoose.model('User', userSchema);

const TestUser = new User({
  name: 'fcuk ew ',
  age: 9900,
  email: 'laude@laag.gaye',
});

TestUser.save()
  .then((e) => {
    console.log('New document added!!');
    process.exit();
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = User;
