const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.param('id', (req, res, next, val) => {
  console.log(`User id is ${val}`);
  next();
});

router.route('/').get(userController.getAllUsers).post(userController.addUser);

router
  .route('/:id')
  .get(userController.searchUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
