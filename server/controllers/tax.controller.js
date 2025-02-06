import Tax from "../models/tax.model.js";
import response from "../utils/response.js";

const createTaxController = async (req, res) => {
  try {
    const { country, state, name, rate } = req.body;
    if (!country) return response(res, 400, false, "Country is missing");
    if (!name) return response(res, 400, false, "Tax name is missing");
    if (!state) return response(res, 400, false, "State is missing");
    if (!rate) return response(res, 400, false, "Rate is missing");

    const newTax = await new Tax({ country, state, name, rate }).save();

    return response(res, 201, true, "Tax created successfully", newTax);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const updateTaxController = async (req, res) => {
  try {
    const { tid } = req.params;
    const { country, state, name, rate } = req.body;

    if (!tid) return response(res, 400, false, "No tid. No updation");
    if (!country) return response(res, 400, false, "Country is missing");
    if (!name) return response(res, 400, false, "Tax name is missing");
    if (!state) return response(res, 400, false, "State is missing");
    if (!rate) return response(res, 400, false, "Rate is missing");

    const updatedTax = await Tax.findByIdAndUpdate(
      tid,
      { country, state, name, rate },
      { new: true }
    );

    if (!updatedTax) {
      return response(res, 404, false, "Tax not found.");
    }

    return response(res, 201, true, "Tax updated successfully", updatedTax);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchAllTaxesController = async (req, res) => {
  try {
    const { pageNo } = req.params;
    const currentPageNo = parseInt(pageNo) || 1;
    const limit = 10;
    const skip = (currentPageNo - 1) * limit;

    const taxesPerPage = await Tax.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalTaxesCount = await Tax.countDocuments();
    const totalPagesCount = Math.ceil(totalTaxesCount / limit);

    return response(
      res,
      200,
      true,
      "Taxes fected successfully",
      taxesPerPage,
      totalPagesCount
    );
  } catch (err) {
    console.error(err.message);
    return response(res, false, 500, "Internal server error");
  }
};

const fetchTaxController = async (req, res) => {
  try {
    const { tid } = req.params;
    if (!tid) return response(res, 400, false, "No tid. No updation");

    const tax = await Tax.findById(tid);
    if (!tax) return response(res, 404, false, "No tax found");

    return response(res, 200, true, "Tax found successfully", tax);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const deleteTaxController = async (req, res) => {
  try {
    const { tid } = req.params;

    if (!tid) return response(res, 400, false, "No tid. No deletion");

    const result = await Tax.findByIdAndDelete(tid);

    return response(res, 200, true, "Tax deleted successfully");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const deleteTaxesController = async (req, res) => {
  try {
    const { tids } = req.params;

    if (!tids || !Array.isArray(tids) || tids.length === 0)
      return response(res, 400, false, "No tids. No multiple deletion");

    const result = await Tax.deleteMany({ _id: { $in: tids } });

    return response(res, 200, true, "Taxes deleted successfully");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

export {
  createTaxController,
  updateTaxController,
  fetchAllTaxesController,
  fetchTaxController,
  deleteTaxController,
  deleteTaxesController,
};
