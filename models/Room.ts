import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
      unique: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);


roomSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "roomId",
});

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

export default Room;
