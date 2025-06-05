const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

//console.log(app.get('env'));
//console.log(process.env);

const DB =
  'mongodb+srv://sailinux:40SU9Nw8BgmDDTM3@cluster0.ooqxlyr.mongodb.net/natours?retryWrites=true&w=majority&appName=Cluster0';
console.log(DB);

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful');
  });
mongoose.set('strictQuery', false);
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name!'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Forbidden Forest',
  rating: 4.5,
  price: 489,
});

testTour
  .save()
  .then((doc) => {
    //console.log(doc);
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
