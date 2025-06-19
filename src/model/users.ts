import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    min: 6,
    max: 50,
  },

  email: {
    type: String,
    required: true,
    min: 6,
    max: 50,
  },

  password: {
    type: String,
    required: true,
    min: 6,
    max: 1000,
  }
  
});

const User = mongoose.model("User", userSchema);

export default User;