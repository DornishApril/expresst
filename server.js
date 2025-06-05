const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

//console.log(app.get('env'));
//console.log(process.env);

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
console.log(DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful');
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name!'],
    unique:true
  },
  rating: {
    type: Number,
    default:4.5
  },
  price: {
    type: Number,
    required:[true,'A tour must have a price']
  }
});

 
const Tour = mongoose.model('Tour',tourSchema);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
