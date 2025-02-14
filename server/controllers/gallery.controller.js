import Gallery from "../models/gallery.model.js";
import response from "../utils/response.js";
import { getImageURL, deleteImage } from "../utils/s3.js";

const uploadGalleryImagesController = async (req, res) => {
  try {
    if (!req.files?.imgKeys)
      return response(res, 400, false, "Image Keys is missing");

    // Extract S3 keys from uploaded files
    const images = req.files?.imgKeys.map((file) => ({ imgKey: file.key }));

    // Save keys to MongoDB
    const insertedImages = await Gallery.insertMany(images);

    return response(
      res,
      201,
      true,
      "Image uplaoded successfully",
      insertedImages
    );
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

    const keys = await Gallery.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    if (keys.length === 0)
      return response(res, 404, false, "No image keys found.");

    const imagesWithURLs = await Promise.allSettled(
      keys.map(async (doc) => {
        return {
          ...doc.toObject(),
          url: await getImageURL(doc.imgKey),
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

const deleteGalleryImageController = async (req, res) => {
  try {
    const { giid } = req.params;
    if (!giid) return response(res, 400, false, "No ggid. No deletion");

    const key = await Gallery.findById(giid);

    if (!key) return response(res, 404, false, "No key. No deletion");

    const result = await deleteImage(key);

    if (result === "Image deleted from S3") {
      const result = await Gallery.findByIdAndDelete(giid);
      return response(res, 200, true, "Image deleted successfully");
    }
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const deleteGalleryImagesController = async (req, res) => {
  try {
    const { giids } = req.params;

    if (!giids || !Array.isArray(giids) || giids.length == 0) {
      return response(res, 400, false, "No giids. No multiple deletion");
    }

    const keys = await Gallery.find({ _id: { $in: giids } });

    if (keys.length === 0)
      return response(res, 404, false, "No image keys found.");

    const deletedImgsFromS3 = keys.map(async (key) => await deleteImage(key));

    const result = await Gallery.deleteMany({ _id: { $in: giids } });

    return response(res, 200, true, "Images deleted successfully");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

export {
  uploadGalleryImagesController,
  fetchAllGalleryImagesController,
  deleteGalleryImageController,
  deleteGalleryImagesController,
};
