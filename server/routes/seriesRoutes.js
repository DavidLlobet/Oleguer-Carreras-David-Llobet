const express = require('express');
const admin = require('firebase-admin');
const multer = require('multer');
const path = require('path');

const {
  getAllSeries, getViewedSeries, getPendingSeries,
  createSerie, modifySerie, deleteSerie, markViewedSerie,
} = require('../controllers/seriesController');

const upload = multer({

  storage: multer.diskStorage({
    destination: 'images',
    filename: (req, file, callback) => {
      console.log('inici upload');
      console.log(file.originalname);
      const oldFilename = file.originalname;
      const oldFilenameExtension = path.extname(oldFilename);
      const oldFilenameWithoutExtension = oldFilename.replace(
        oldFilenameExtension,
        '',
      );

      const newFilename = `${oldFilenameWithoutExtension}-${Date.now()}${oldFilenameExtension}`;

      callback(null, newFilename);
    },
  }),
});

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: 'w07ch01.appspot.com',
});

const router = express.Router();

router.get('/', getAllSeries);
router.get('/viewed', getViewedSeries);
router.get('/pending', getPendingSeries);
router.post('/', createSerie);
router.post('/new', upload.single('picture'), async (req, res, next) => {
  const bucket = admin.storage().bucket();
  await bucket.upload(req.file.path);
  await bucket.file(req.file.filename).makePublic();
  const fileURL = bucket.file(req.file.filename).publicUrl();
  console.log(fileURL);
  next();
}, createSerie);
router.put('/:idSerie', modifySerie);
router.delete('/:idSerie', deleteSerie);
router.patch('/view/:idSerie', markViewedSerie);

module.exports = router;
