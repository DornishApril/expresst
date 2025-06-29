//to strictly follow the tutorial

const express = require('express');
const fs = require('fs');
const { get } = require('http');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

//const overviewhtml = fs.readFileSync(`./public/overview.html`);

app.use(express.static(`./public`));

// app.use(
//   (
//     req,
//     res,
//     next, //next can be named anything, its the 3rd variable in order
//   ) => {
//     console.log('Hlo from the middle-ware👋');
//     next();
//   },
// );

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

//MOUNTING
app.get('/', (req, res) => {
  res.send(`
    <h1>Natours API- Building towards Excellence</h1>
    <p>API endpoints:</p>
    <ul>
      <li><a href="/api/v1/tours">/api/v1/tours</a></li>
      <li><a href="/api/v1/users">/api/v1/users</a></li>
    </ul>
  `);
});
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//data

//console.log(tours);

//route handlers
//ROUTES

//TOUR ROUTES

module.exports = app;
