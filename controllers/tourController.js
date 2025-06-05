const Tour = require('../models/tourModel');

// const tours = JSON.parse(fs.readFileSync(`./data/tours-simple.json`));

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};

exports.searchTour = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};

exports.addTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    console.log(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    console.log(`the error issss ----- ${err}`);
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: {
      tour: 'null',
    },
  });
};
