const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();
router.param('id', tourController.checkID);
//router.param('id', tourController.checkBody);

router.route('/').get(tourController.getAllTours).post(tourController.addTour);

router
  .route('/:id')
  .get(tourController.searchTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
