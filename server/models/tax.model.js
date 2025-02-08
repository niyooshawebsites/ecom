import mongoose from "mongoose";

const taxSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Andaman and Nicobar Islands",
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chandigarh",
        "Chhattisgarh",
        "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Ladakh",
        "Lakshadweep",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Puducherry",
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
