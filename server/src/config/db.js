import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) throw new Error("MONGO_URI not defined in environment variables");
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected ✅");
  } catch (error) {
    console.error("MongoDB connection error ❌:", error);
    process.exit(1); // يوقف السيرفر لو فشل الاتصال
  }
};

export default connectDB;
