import Customize from "../models/customize.model.js";
import response from "../utils/response.js";

const createCustomizationController = async (req, res) => {
  try {
    const {
      headerColor,
      headerFontColor,
      headerBtnColor,
      footerColor,
      footerFontColor,
      btnColor,
      btnFontColor,
    } = req.body;

    const fetchCustomizationCount = await Customize.countDocuments();

    if (fetchCustomizationCount < 1) {
      const newCustomization = await new Customize({
        headerColor,
        headerFontColor,
        headerBtnColor,
        footerColor,
        footerFontColor,
        btnColor,
        btnFontColor,
      }).save();

      return response(
        res,
        201,
        true,
        "Customization created successfully",
        newCustomization
      );
    } else {
      return response(
        res,
        201,
        true,
        "Customization already available",
        fetchCustomizationCount
      );
    }
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const updateCustomizationController = async (req, res) => {
  try {
    const {
      headerColor,
      headerFontColor,
      headerBtnColor,
      footerColor,
      footerFontColor,
      btnColor,
      btnFontColor,
    } = req.body;

    console.log(
      headerColor,
      headerFontColor,
      headerBtnColor,
      footerColor,
      footerFontColor,
      btnColor,
      btnFontColor
    );

    const fetchCustomization = await Customize.findOne({});

    const updatedCustomization = await Customize.findByIdAndUpdate(
      fetchCustomization._id,
      {
        headerColor,
        headerFontColor,
        headerBtnColor,
        footerColor,
        footerFontColor,
        btnColor,
        btnFontColor,
      },
      { new: true }
    );

    return response(
      res,
      201,
      true,
      "Customization updated successfully",
      updatedCustomization
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchCustomizationController = async (req, res) => {
  try {
    const customization = await Customize.find({});
    if (!customization)
      return response(res, 404, false, "No customization found");

    return response(
      res,
      201,
      true,
      "Customization found successfully",
      customization
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

export {
  createCustomizationController,
  updateCustomizationController,
  fetchCustomizationController,
};
