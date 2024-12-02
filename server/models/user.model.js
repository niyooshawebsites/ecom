import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  contactNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    default: "",
  },
  address: {
    houseNo: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    streetNo: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    locality: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    district: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    state: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    pincode: {
      type: Number,
      required: true,
      trim: true,
      default: null,
    },
  },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address",
      ], // Regex for email validation
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      default: "0",
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    contactDetails: contactSchema,
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

export default User;
