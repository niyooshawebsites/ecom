import mongoose from "mongoose";

const customizeSchema = new mongoose.Schema(
  {
    headerColor: {
      type: String,
      default: "#1d4ed8",
    },
    headerFontColor: {
      type: String,
      default: "#f4f4f4",
    },
    headerBtnColor: {
      type: String,
      default: "#f97316",
    },
    footerColor: {
      type: String,
      default: "#1d4ed8",
    },
    footerFontColor: {
      type: String,
      default: "#f4f4f4",
    },
    btnColor: {
      type: String,
      default: "#1d4ed8",
    },
    btnFontColor: {
      type: String,
      default: "#f4f4f4",
    },
  },
  {
    timestamps: true,
  }
);

const Customize = mongoose.model("customize", customizeSchema);
export default Customize;
