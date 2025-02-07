import mongoose from "mongoose";

const taxSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
      ],
    },
    CGSTName: {
      type: String,
      required: true,
      trim: true,
      default: "CGST",
    },
    SGSTName: {
      type: String,
      required: true,
      trim: true,
      default: "SGST",
    },
    CGSTRate: {
      type: Number,
      required: true,
      trim: true,
      default: 18,
    },
    SGSTRate: {
      type: Number,
      required: true,
      trim: true,
      default: 18,
    },
  },
  {
    timestamps: true,
  }
);

const Tax = mongoose.model("tax", taxSchema);
export default Tax;
