import mongoose from "mongoose"


export const connectMongoDB  = async () => {
     try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
    }
  } catch (error) {
    console.log("MongoDB connection error", error);
    throw error;
  }
};
  