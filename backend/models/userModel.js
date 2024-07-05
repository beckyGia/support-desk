import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Add A Name"],
    },
    email: {
      type: String,
      required: [true, "Please Add A Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Add A Password"], //this is saying that it is required and if its not inputted, it will respond with the message of "Please Add A Password"
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
