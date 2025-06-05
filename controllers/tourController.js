const Tour = require('../models/tourModel');

// const tours = JSON.parse(fs.readFileSync(`./data/tours-simple.json`));

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      length: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: 'Error!',
      message: err.message,
    });
  }
};

exports.searchTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: 'Not Found',
      message: err.message,
    });
  }
};

exports.addTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    //console.log(req.body);

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

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
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

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    //console.log(req);
    res.status(200).json({
      status: 'success',
      data: {
        tour: null,
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
