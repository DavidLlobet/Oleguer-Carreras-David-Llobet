const express = require('express');
const { upload } = require('../controllers/imageController');

const {
  getAllSeries, getViewedSeries, getPendingSeries,
  createSerie, modifySerie, deleteSerie, markViewedSerie,
} = require('../controllers/seriesController');

const router = express.Router();

router.get('/', getAllSeries);
router.get('/viewed', getViewedSeries);
router.get('/pending', getPendingSeries);
router.post('/', createSerie);
router.post('/new', upload.single('picture'), createSerie);
router.put('/:idSerie', modifySerie);
router.delete('/:idSerie', deleteSerie);
router.patch('/view/:idSerie', markViewedSerie);

module.exports = router;
