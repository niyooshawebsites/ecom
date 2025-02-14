Gallery model File :

import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    imgKey: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model("gallery", gallerySchema);
export default Gallery;

Gallery controller file:

import Gallery from "../models/gallery.model.js";
import response from "../utils/response.js";
import { getImageURL, deleteImage } from "../utils/s3.js";

const uploadGalleryImagesController = async (req, res) => {
  try {
    console.log(req.files.imgKeys);
    const { imgKeys } = req.files;
    console.log(imgKeys);

    if (!imgKeys) return response(res, 400, false, "Keya is missing");

    const imageKeys = await Gallery.insertMany();

    return response(res, 201, true, "Image uplaoded successfully", imageKeys);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchAllGalleryImagesController = async (req, res) => {
    try {
      const { pageNo } = req.params;
      const currentPageNo = parseInt(pageNo) || 1;
      const limit = 50;
      const skip = (currentPageNo - 1) * limit;
  
      const keys = await Gallery.find().skip(skip).limit(limit);
  
      if (keys.length === 0)
        return response(res, 404, false, "No image keys found.");
  
      const imagesWithURLs = await Promise.allSettled(
        keys.map((key) => {
          return {
            ...key,
            url: getImageURL(key),
          };
        })
      );
  
      if (imagesWithURLs.length === 0)
        return response(res, 404, false, "No images found");
  
      return response(res, 200, true, "Image found successfully", imagesWithURLs);
    } catch (err) {
      console.error(err.message);
      return response(res, 500, false, "Internal server error");
    }
  };

export {
    uploadGalleryImagesController,
    fetchAllGalleryImagesController
  };

Gallery route file:

import express from "express";
import upload from "../middlewares/upload.js";
import auth from "../middlewares/auth.middleware.js";
import {
  uploadGalleryImagesController,
  fetchAllGalleryImagesController
} from "../controllers/gallery.controller.js";

const galleryRouter = express.Router();

galleryRouter.post(
    "/upload-gallery-images",
    auth,
    upload.fields({ name: "imgKey", maxCount: 5 }),
    uploadGalleryImagesController
  );

  export default galleryRouter;

upload middleware file:

import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "../utils/s3.js";
import dotenv from "dotenv";
dotenv.config();

// configure multer-s3 storage
const storage = multerS3({
  s3,
  bucket: process.env.AWS_BUCKET_NAME,
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    cb(null, `products/${Date.now()}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpg", "image/png", "image/webp"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only JPG, PNG, and WEBP files are allowed!"), true);
  }
};

// intialize multer upload instance
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5mb limit
});

export default upload;


S3 ultis file:

import {
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

// Initialize AWS S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// generate a signed URL to view the image
const getImageURL = async (fileKey) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    };

    return await getSignedUrl(s3, new GetObjectCommand(params), {
      expiresIn: 3600,
    });
  } catch (err) {
    console.error(err.message);
  }
};

// delete an image from S3
const deleteImage = async (fileKey) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    };

    await s3.send(new DeleteObjectCommand(params));
    return "Image deleted from S3";
  } catch (err) {
    console.error(err.message);
    return "S3 image deletion failed";
  }
};

export { s3, getImageURL, deleteImage };


Front end react file:

import { useState, useEffect } from "react";
import { SlRefresh } from "react-icons/sl";
import axios from "axios";
import { toast } from "react-toastify";
import Pagination from "./Pagination";
import NoData from "./NoData";

const DisplayGallery = () => {
  const [galleryImages, setGalleryImages] = useState({
    imgKeys: [],
  });

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryImages((prev) => ({ ...prev, imgKeys: files }));
  };

  const uplaodGalleryImages = async (e) => {
    e.preventDefault();

    const galleryData = new FormData();

    // append each image of the gallery
    galleryImages.imgKeys.forEach((imgKey) => {
      galleryData.append("imgKeys", imgKey);
    });

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/upload-gallery-images`,
        galleryData,
        { withCredentials: true }
      );

      if (res.data.sucess) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchAllGalleryImages = async (pageNo = 1) => {
    try {
      const res = axios.get(
        `http://localhost:8000/api/v1/fetch-all-gallery-images/${pageNo}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setGalleryImages(res.data.data);
      }
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  const deleteImage = async () => {
    try {
      const res = axios.delete(
        `http://localhost:8000/api/v1/delete-gallery-image`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
    }
  };

  useEffect(() => {
    fetchAllGalleryImages();
  }, []);

  return (
    <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
      <div className="w-10/12">
        <div className="flex justify-center items-center mt-10">
          <h1 className="text-4xl text-center py-3 poppins-light bg-gray-200 rounded-md p-3 mb-2">
            Gallery
          </h1>
          <button onClick={fetchAllGalleryImages} className="ml-5">
            <SlRefresh className="text-4xl text-blue-600 hover:text-orange-600" />
          </button>
        </div>
        <div className="flex my-5">
          <form
            onSubmit={uplaodGalleryImages}
            className="flex w-full"
            encType="multipart/form-data"
          >
            <input
              type="file"
              name="images"
              id="images"
              onChange={handleChange}
              multiple
              className="border border-gray-300 rounded p-1 mr-2 w-full"
              required
            />
            <button className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded text-white">
              Upload
            </button>
          </form>
        </div>
        {galleryImages.length > 0 ? (
          <div className="flex flex-reverse">
            {galleryImages.map((image) => (
              <img key={image._id} src={image.url} width={150} />
            ))}
          </div>
        ) : (
          <NoData data={"Images"} />
        )}
      </div>
    </div>
  );
};

export default DisplayGallery;


I want to upload the image in the S3 bucket and save in the key in mongodb but unable to do so


  
