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
    console.error('DB connection failed:', err);
  });
mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 3000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
}

module.exports = app;
