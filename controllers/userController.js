const User = require('../models/userModel');

// const Users = JSON.parse(fs.readFileSync(`./data/Users-simple.json`));

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      length: users.length,
      data: {
        users,
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

exports.searchUser = async (req, res) => {
  try {
    const users = await User.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        users,
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

exports.addUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    //console.log(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        User: newUser,
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

exports.updateUser = async (req, res) => {
  try {
    const users = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        users,
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

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    //console.log(req);
    res.status(200).json({
      status: 'success',
      data: {
        users: null,
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
