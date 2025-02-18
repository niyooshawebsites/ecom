import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "../utils/s3.js";
import dotenv from "dotenv";
dotenv.config();

// configure multer-s3 storage
const storageProducts = multerS3({
  s3,
  bucket: process.env.AWS_BUCKET_NAME,
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    cb(null, `gallery/${Date.now()}_${file.originalname}`);
  },
});

// configure multer-s3 storage
const storageGallery = multerS3({
  s3,
  bucket: process.env.AWS_BUCKET_NAME,
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    cb(null, `gallery/${Date.now()}_${file.originalname}`);
  },
});

// configure multer-s3 storage
const storageLogo = multerS3({
  s3,
  bucket: process.env.AWS_BUCKET_NAME,
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    cb(null, `gallery/LOGO`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only JPG, PNG, and WEBP files are allowed!"), true);
  }
};

// intialize multer upload instance
const uploadProductImgs = multer({
  storage: storageProducts,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5mb limit
  fileFilter,
});

const uploadGalleryImgs = multer({
  storage: storageGallery,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5mb limit
  fileFilter,
});

const uploadLogo = multer({
  storage: storageLogo,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5mb limit
  fileFilter,
});

export { uploadProductImgs, uploadGalleryImgs, uploadLogo };
