import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGO_URI}`);
    if (connect) {
      console.log(`DB connection successful`.bgGreen);
    } else {
      console.log(`DB connection failed`.bgRed);
    }
  } catch (err) {
    console.error(err.message);
  }
};

export default connectDB;
