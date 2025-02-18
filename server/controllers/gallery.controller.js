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

    const totalGalleryCount = await Gallery.countDocuments();
    const totalPagesCount = Math.ceil(totalGalleryCount / limit);

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

    return response(
      res,
      200,
      true,
      "Image found successfully",
      imagesWithURLs,
      totalPagesCount
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const deleteGalleryImageController = async (req, res) => {
  try {
    const { giid } = req.params;
    if (!giid) return response(res, 400, false, "No ggid. No deletion");

    const doc = await Gallery.findById(giid);

    if (!doc) return response(res, 404, false, "No key. No deletion");

    const result = await deleteImage(doc.imgKey);

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

const uploadLogoController = async (req, res) => {
  try {
    if (!req.file.key) return response(res, 400, false, "Logo Key is missing");

    // Extract S3 keys from uploaded files
    const imageKey = req.file.key;

    const result = await Gallery.findOne({ imgKey: image });

    if (result) return response(res, 409, false, "Logo key already exists");

    // save key to mongoDB
    const insertedImage = await new Gallery({ imgKey: imageKey }).save();

    return response(
      res,
      201,
      true,
      "Logo uplaoded successfully",
      insertedImage
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchLogoController = async (req, res) => {
  try {
    const doc = await Gallery.findOne({ imgKey: "gallery/LOGO" });

    if (!doc) return response(res, 404, false, "No image keys found.");

    const logoWithURL = await getImageURL(doc.imgKey);

    if (!logoWithURL) return response(res, 404, false, "No images found");

    return response(res, 200, true, "Logo found successfully", {
      logoWithURL,
      keyId: doc._id,
    });
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const deleteLogoController = async (req, res) => {
  try {
    const { iid } = req.params;
    if (!iid) return response(res, 400, false, "No iid. No deletion");

    const doc = await Gallery.findById(iid);

    if (!doc) return response(res, 404, false, "No key. No deletion");

    const result = await deleteImage(doc.imgKey);

    if (result === "Image deleted from S3") {
      const result = await Gallery.findByIdAndDelete(iid);
      return response(res, 200, true, "Logo deleted successfully");
    }
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
  uploadLogoController,
  fetchLogoController,
  deleteLogoController,
};
