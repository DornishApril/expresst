const EventEmitter = require('events');
const fs = require('fs');
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(fs.readFileSync(`./data/tours-simple.json`));

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  if (val > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  next();
};

exports.checkBody = (req, res, next) => {
  console.log(req);
  console.log(
    `Checking body. . . . name: ${req.body.name} price:${req.body.price}\n\n`,
  );
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid Data',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  console.log('request received');
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.searchTour = (req, res) => {
  console.log('request received');
  console.log(req.params);

  const id = req.params.id * 1;

  //const tour = tours.find((el) => el.id === id);

  (async () => {
    try {
      const tour = await tours.find((el) => el.id === id);
      if (!tour) {
        return res.status(404).json({
          status: 'fail',
          message: 'Invalid ID',
        });
      }

      res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
          tour,
        },
        Z,
      });
    } catch (err) {
      console.log(err);
    }
  })();

  // (async () =>
  // {
  //   try
  //   {

  //     const tour = await searchT();
  //     if (!tour) {
  //       return res.status(404).json({
  //         status: 'fail',
  //         message: 'Invalid ID',
  //       });
  //     }

  //     res.status(200).json({
  //       status: 'success',
  //       results: tours.length,
  //       data: {
  //         tour,
  //       },
  //     });
  //   }
  //   catch (err)
  //   {
  //     console.log(err);
  //   }

  // })();
};

class NewTour extends EventEmitter {
  constructor() {
    super();
  }
}

const tourAdded = new NewTour();

tourAdded.on('added', (tour) => {
  console.log('New Tour Added!');
  console.log(JSON.stringify(tour));
});

exports.addTour = (req, res) => {
  console.log('request received');
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);
  //console.log(req.body);
  fs.writeFile(
    `${__dirname}/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
  tourAdded.emit('added', newTour);

  //res.send('Done');
};

exports.updateTour = (req, res) => {
  console.log('request received');
  const id = req.params.id * 1;

  // const tour = tours.find((el) => el.id === id);

  //   if (id > tours.length) {
  //     return res.status(404).json({
  //       status: 'fail',
  //       message: 'Invalid ID',
  //     });
  //   }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>',
    },
  });
};

exports.deleteTour = (req, res) => {
  console.log('request received');
  const id = req.params.id * 1;

  // const tour = tours.find((el) => el.id === id);

  //   if (id > tours.length) {
  //     return res.status(404).json({
  //       status: 'fail',
  //       message: 'Invalid ID',
  //     });
  //   }

  res.status(204).json({
    status: 'success',
    data: {
      tour: 'null',
    },
  });
};
