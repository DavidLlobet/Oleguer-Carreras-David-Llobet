const Platform = require('../../database/models/platform');

const getPlatforms = async (req, res, next) => {
  try {
    const platforms = await Platform.find();
    res.json(platforms);
  } catch (error) {
    error.code = 400;
    error.message = 'Cannot get platforms';
    next(error);
  }
};
const addPlatform = async (req, res, next) => {
  try {
    const newPlatform = await Platform.create(req.body);
    res.json(newPlatform);
  } catch (error) {
    error.code = 400;
    error.message = 'Cannot create the platform';
    next(error);
  }
};

const updatePlatform = async (req, res, next) => {};
const deletePlatform = async (req, res, next) => {};

module.exports = {
  getPlatforms, addPlatform, updatePlatform, deletePlatform,
};
