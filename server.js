const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

//console.log(app.get('env'));
//console.log(process.env);

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
//console.log(DB);

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.log('Error! Cant Connect to the Database!');
    console.log(err);
  });
mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
