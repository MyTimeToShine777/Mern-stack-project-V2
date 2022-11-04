import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url), console.log(`MongoDB Connected...`.bgRed.bold);
};

export default connectDB;
