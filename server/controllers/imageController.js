const multer = require('multer');
const path = require('path');

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

module.exports = { upload };
