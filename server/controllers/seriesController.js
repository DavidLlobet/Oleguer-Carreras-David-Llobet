const Serie = require('../../database/models/serie');

const getAllSeries = async (req, res, next) => {
  try {
    const series = await Serie.find();
    res.json(series);
  } catch (error) {
    error.code = 400;
    error.message = 'Cannot get the series';
    next(error);
  }
};

const getViewedSeries = async (req, res, next) => {
  try {
    const viewedSeries = await Serie.find({ isWatched: true });
    res.json(viewedSeries);
  } catch (error) {
    error.code = 400;
    error.message = 'Cannot get the series';
    next(error);
  }
};

const getPendingSeries = async (req, res, next) => {
  try {
    const pendingSeries = await Serie.find({ isWatched: false });
    res.json(pendingSeries);
  } catch (error) {
    error.code = 400;
    error.message = 'Cannot get the series';
    next(error);
  }
};

const createSerie = async (req, res, next) => {
  console.log('hola');
  try {
    const serieCreated = await Serie.create(req.body);
    res.json(serieCreated);
  } catch (error) {
    error.code = 400;
    error.message = 'Cannot add the serie';
    next(error);
  }
};

const modifySerie = async (req, res, next) => {
  const { idSerie } = req.params;
  try {
    const serieModified = await Serie.findByIdAndUpdate(idSerie, req.body, {
      new: true,
    });
    res.json(serieModified);
  } catch (error) {
    error.code = 400;
    error.message = 'Cannot modify the serie';
    next(error);
  }
};

const deleteSerie = async (req, res, next) => {
  const { idSerie } = req.params;
  try {
    const deletedSerie = await Serie.findByIdAndDelete(idSerie);
    if (deletedSerie) {
      res.json(deletedSerie);
    } else {
      const error = new Error('Serie to delete not found');
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = 'Cannot delete the serie';
    next(error);
  }
};

const markViewedSerie = async (req, res, next) => {};

module.exports = {
  getAllSeries,
  getViewedSeries,
  getPendingSeries,
  createSerie,
  modifySerie,
  deleteSerie,
  markViewedSerie,
};
