import Tax from "../models/tax.model.js";
import response from "../utils/response.js";

const createTaxController = async (req, res) => {
  try {
    const { cid, GSTRate } = req.body;

    if (!GSTRate) return response(res, 400, false, "GSTRate is missing");

    if (cid == null) {
      const result = await Tax.countDocuments();
      if (result) return response(res, 400, false, "Invaid GST setting");
    }

    if (cid) {
      const result = await Tax.findOne({ category: null });
      if (result) return response(res, 400, false, "Invaid GST setting");
    }

    const tax = await Tax.findOne({ category: cid });

    if (tax) return response(res, 409, false, "Tax already exists");

    const newTax = await new Tax({ category: cid, GSTRate }).save();

    return response(res, 201, true, "Tax created successfully", newTax);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const updateTaxController = async (req, res) => {
  try {
    const { tid } = req.params;
    const { cid, GSTRate } = req.body;

    if (!tid) return response(res, 400, false, "No tid. No updation");
    if (!cid) return response(res, 400, false, "No cid. No updation");
    if (!GSTRate) return response(res, 400, false, "GSTRate is missing");

    const updatedTax = await Tax.findByIdAndUpdate(
      tid,
      { category: cid, GSTRate },
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
      .sort({ createdAt: -1 })
      .populate("category");

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
    if (!tid) return response(res, 400, false, "No tid. No tax");

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

const fetchTaxByCategoryController = async (req, res) => {
  try {
    const { cid } = req.params;
    if (!cid) return response(res, 400, false, "No cid. No updation");

    const tax = await Tax.findOne({ category: cid });
    if (!tax) return response(res, 404, false, "No tax found");

    return response(res, 200, true, "Tax found successfully", tax);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

// const fetchTaxByStateWithoutLoginController = async (req, res) => {
//   try {
//     const { state } = req.params;
//     if (!state) return response(res, 400, false, "No state. No updation");

//     const tax = await Tax.findOne({ state });
//     if (!tax) return response(res, 404, false, "No tax found");

//     return response(res, 200, true, "Tax found successfully", tax);
//   } catch (err) {
//     console.error(err.message);
//     return response(res, 500, false, "Internal server error");
//   }
// };

export {
  createTaxController,
  updateTaxController,
  fetchAllTaxesController,
  fetchTaxController,
  deleteTaxController,
  deleteTaxesController,
  fetchTaxByCategoryController,
  // fetchTaxByStateWithoutLoginController,
};
