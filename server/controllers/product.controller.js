import Product from "../models/product.model.js";
import response from "../utils/response.js";

const createProductController = async (req, res) => {
  try {
    const { name, price, category, shortDesc, longDesc } = req.body;

    if (!name || !price || !category || !shortDesc || !longDesc)
      return response(res, false, "Please fill out all the information");

    const product = await Product.findOne({ name });
    if (product) return response(res, false, "Product already exists");

    const newProduct = await new Product(req.body).save();
    return response(res, true, "Product created successfully", newProduct);
  } catch (err) {
    console.error(err.message);
    return response(res, false, "Internal server error");
  }
};

const updateProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const { name, price, category, shortDesc, longDesc } = req.body;

    if (!pid) response(res, false, "No product id!. No updation!");

    if ((name, price, category, shortDesc, longDesc))
      return response(res, false, "Please fill out all the details");

    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
      new: true,
    });

    return response(res, true, "Product updated successfully", updatedProduct);
  } catch (err) {
    console.error(err.message);
    return response(res, false, "Interal server error");
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { pid } = req.params;

    if (!pid) response(res, false, "No product id. No deletion");

    const result = await Product.findByIdAndDelete(pid);
  } catch (err) {
    console.error(err.message);
    return response(res, false, "Internal server error");
  }
};

export {
  createProductController,
  updateProductController,
  deleteProductController,
};
