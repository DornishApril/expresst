const Tour = require('../models/tourModel');

// const tours = JSON.parse(fs.readFileSync(`./data/tours-simple.json`));

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  console.log('request received');
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.searchTour = (req, res) => {
  console.log('request received');
  console.log(req.params);

  const id = req.params.id * 1;

  //const tour = tours.find((el) => el.id === id);

  // (async () => {
  //   try {
  //     const tour = await tours.find((el) => el.id === id);
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
  //       Z,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // })();

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

exports.addTour = (req, res) => {
  console.log('request received');
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });

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
