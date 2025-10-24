import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: true,
  },
  targetDate: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },

  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
}
}, 
{ 
    timestamps: true 
}
);

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;