import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    imgKey: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model("gallery", gallerySchema);
export default Gallery;
