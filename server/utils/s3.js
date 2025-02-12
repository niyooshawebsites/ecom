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

// generate a Pre-signed URL for image upload
const generateUploadURL = async (fileName) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `products/${Date.now()}_${fileName}`,
    };

    return await getSignedUrl(s3, new PutObjectCommand(params), {
      expiresIn: 3600,
    });
  } catch (err) {
    console.error(err.message);
  }
};

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
  } catch (err) {
    console.error(err.message);
  }
};

export { s3, generateUploadURL, getImageURL, deleteImage };
