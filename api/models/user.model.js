import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture : {
      type : String,
      default : "https://static.vecteezy.com/system/resources/thumbnails/024/095/208/small_2x/happy-young-man-smiling-free-png.png"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;