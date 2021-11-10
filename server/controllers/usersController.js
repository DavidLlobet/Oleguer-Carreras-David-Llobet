const User = require('../../database/models/user');

const createUser = async (req, res, next) => {
  try {
    const userCreated = await User.create(req.body);
    res.json(userCreated);
  } catch (error) {
    error.code = 400;
    error.message = 'Cannot create the user';
    next(error);
  }
};

const loginUser = async (req, res, next) => {};

module.exports = { createUser, loginUser };
