import mongoose from "mongoose"


export const connectMongoDB  = async () => {
     try {
    if (process.env.mongoUri) {
      await mongoose.connect(process.env.mongoUri);
    }
  } catch (error) {
    console.log("MongoDB connection error", error);
    throw error;
  }
};
  