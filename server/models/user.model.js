import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  contactNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  address: {
    houseNo: {
      type: String,
      required: true,
      trim: true,
    },
    streetNo: {
      type: String,
      required: true,
      trim: true,
    },
    locality: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: Number,
      required: true,
      trim: true,
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
    orders: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

export default User;
