import mongoose from "mongoose";

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please Select A Product"],
      enum: ["iPhone", "MacBook Pro", "iMac", "iPad"],
    },
    description: {
      type: String,
      required: [true, "Please Enter A Description Of The Issue"],
    },
    status: {
      type: String,
      enum: ["New", "Open", "Closed"],
      default: "New",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
