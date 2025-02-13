import Gallery from "../models/gallery.model.js";
import response from "../utils/response.js";
import { getImageURL, deleteImage } from "../utils/s3.js";

const uploadGalleryImagesController = async (req, res) => {
  try {
    const { imageURL } = req.files;
    if (!imageURL) return response(res, 400, false, "Image is missing");

    const existingImg = await Gallery.findOne({ url: imageURL });
    if (existingImg) return response(res, 400, false, "Image already exists");

    const img = await new Gallery({ url: imageURL }).save();

    return response(res, 201, true, "Image uplaoded successfully", img);
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

    // const imagesWithURLs = await Promise.all(
    //   keys.map((key) => getImageURL(key))
    // );

    const imagesWithURLs = keys.map(async (key) => await getImageURL(key));

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
