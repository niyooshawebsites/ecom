import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model("gallery", gallerySchema);
export default Gallery;
