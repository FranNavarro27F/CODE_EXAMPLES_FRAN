import multer from "multer";

const storage = multer.diskStorage({
  destination: "../public/img",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });
