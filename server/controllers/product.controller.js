import Product from "../models/product.model.js";
import response from "../utils/response.js";
import slugify from "slugify";
import { getImageURL } from "../utils/s3.js";
import Gallery from "../models/gallery.model.js";

const createProductController = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      length,
      breadth,
      height,
      weight,
      shortDesc,
      longDesc,
    } = req.body;

    if (
      !name ||
      !price ||
      !category ||
      !length ||
      !breadth ||
      !height ||
      !weight ||
      !shortDesc ||
      !longDesc
    )
      return response(res, 400, false, "Please fill out all the information");

    // check if the product already exists
    const product = await Product.findOne({ name });
    if (product) return response(res, 409, false, "Product already exists");

    // extract S3 image url from multer upload - keys are already added by multer-s3
    const imgKey = req.files.img[0].key;
    const galleryKeys = req.files.gallery.map((file) => file.key);
    const galleryKeysForGallery = req.files.gallery.map((file) => ({
      imgKey: file.key,
    }));

    const newProduct = await new Product({
      ...req.body,
      img: imgKey,
      gallery: galleryKeys,
    }).save();

    // saving the uploaded images in gallery
    const galleryImages = await Gallery.insertMany([
      ...galleryKeysForGallery,
      { imgKey },
    ]);

    return response(res, 201, true, "Product created successfully", newProduct);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const updateProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const {
      name,
      price,
      category,
      length,
      breadth,
      height,
      weight,
      shortDesc,
      longDesc,
    } = req.body;

    if (!pid) response(res, 400, false, "No product id!. No updation!");

    const updatedSlug = slugify(name, { lower: true, strict: true });

    if (
      !name ||
      !price ||
      !category ||
      !length ||
      !breadth ||
      !height ||
      !weight ||
      !shortDesc ||
      !longDesc
    )
      return response(res, 400, false, "Please fill out all the details");

    // Fetch the existing product
    const existingProduct = await Product.findById(pid);
    if (!existingProduct) {
      return response(res, 404, false, "Product not found");
    }

    let imgKey = existingProduct.img; // Keep the existing image if not updating
    let galleryKeys = existingProduct.gallery; // Keep the existing gallery images
    let galleryKeysForGallery = [];

    // extract S3 image url from multer upload - keys are already added by multer-s3

    if (req.files) {
      // If a new main image is uploaded, update it
      if (req.files.img && req.files.img.length > 0) {
        imgKey = req.files.img[0].key;
      }

      if (req.files.gallery && req.files.gallery.length > 0) {
        galleryKeys = req.files.gallery.map((file) => file.key);
        galleryKeysForGallery = req.files.gallery.map((file) => ({
          imgKey: file.key,
        }));
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      pid,
      {
        $set: {
          ...req.body,
          slug: updatedSlug,
          img: imgKey,
          gallery: galleryKeys,
        },
      },
      {
        new: true,
      }
    );

    // saving the uploaded images in gallery
    const galleryImages = await Gallery.insertMany([
      ...galleryKeysForGallery,
      { imgKey },
    ]);

    return response(
      res,
      201,
      true,
      "Product updated successfully",
      updatedProduct
    );
  } catch (err) {
    console.error(err);
    return response(res, 500, false, "Interal server error");
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { pid } = req.params;

    if (!pid) response(res, 400, false, "No product id. No deletion");

    const result = await Product.findByIdAndDelete(pid);

    return response(res, 200, true, "Product deleted successfully");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchAllProductsController = async (req, res) => {
  try {
    const { pageNo } = req.params;
    const currentPageNo = parseInt(pageNo) || 1;
    const limit = 12;
    const skip = (currentPageNo - 1) * limit;
    const productsPerPage = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("category")
      .lean(); // Convert to plain object for performance

    const productsPerPageWithImgURLs = await Promise.all(
      productsPerPage.map(async (product) => {
        const imgURL = await getImageURL(product.img);
        const galleryURLs = await Promise.allSettled(
          product.gallery.map((key) => getImageURL(key))
        );

        return {
          ...product,
          img: imgURL,
          gallery: galleryURLs,
        };
      })
    );

    const totalProductsCount = await Product.countDocuments();
    const totalPagesCount = Math.ceil(totalProductsCount / limit);

    return response(
      res,
      200,
      true,
      `${productsPerPage.length} products fetched`,
      productsPerPageWithImgURLs,
      totalPagesCount
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    if (!pid) return response(res, 400, false, "Product ID is missing");

    const product = await Product.findById(pid).populate("category");
    if (!product) return response(res, 404, false, "Product not found");

    // generate fresh Pre-signed URLS for the images
    const imgURL = await getImageURL(product.img);
    const galleryURLs = await Promise.allSettled(
      product.gallery.map((key) => getImageURL(key))
    );

    const productWithImgURLs = {
      ...product.toObject(), // convert mongoose document to plain object
      img: imgURL,
      gallery: galleryURLs,
    };

    return response(
      res,
      200,
      true,
      "Product found successfully",
      productWithImgURLs
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal sever error");
  }
};

const fetchAllProductsByCategoryController = async (req, res) => {
  try {
    const { cid } = req.params;

    if (!cid) return response(res, 400, false, "Cateogry Id is missing");

    const products = await Product.find({ category: cid })
      .sort({ createdAt: -1 })
      .populate("category");

    if (products.length === 0)
      return response(res, 404, false, "No products in this category");

    return response(res, 200, true, "Products found successfully", products);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal sever error");
  }
};

const fetchAllProductsBySlugController = async (req, res) => {
  try {
    const { pSlug } = req.params;

    if (!pSlug) return response(res, 400, false, "Product slug is missing");

    const products = await Product.find({
      slug: { $regex: pSlug, $options: "i" },
    })
      .sort({ createdAt: -1 })
      .populate("category");

    if (products.length === 0)
      return response(res, 404, false, "No products in this category");

    return response(res, 200, true, "Products found successfully", products);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal sever error");
  }
};

const fetchAllProductsByPriceRangeController = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.params;

    if (!minPrice) return response(res, 400, false, "Min price is missing");
    if (!maxPrice) return response(res, 400, false, "Max price is missing");

    const products = await Product.find({
      price: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) },
    })
      .sort({ createdAt: -1 })
      .populate("category");

    if (products.length === 0)
      return response(res, 404, false, "No products in this price range");

    return response(res, 200, true, "Products found successfully", products);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal sever error");
  }
};

const deleteProductsController = async (req, res) => {
  try {
    const { pids } = req.params;

    if (!pids || !Array.isArray(pids) || pids.length === 0)
      return response(res, 400, false, "No pids. No multiple deletion");

    const result = await Product.deleteMany({ _id: { $in: pids } });

    return response(res, 200, true, "Products deleted successfully");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

export {
  createProductController,
  updateProductController,
  deleteProductController,
  fetchAllProductsController,
  fetchProductController,
  fetchAllProductsByCategoryController,
  fetchAllProductsBySlugController,
  fetchAllProductsByPriceRangeController,
  deleteProductsController,
};
