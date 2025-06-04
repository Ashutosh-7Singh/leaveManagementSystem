const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
     email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true  // ✅ fixed typo here
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["User", "Admin"], default: "User" },
    dateOfJoining: { type: Date, required: true },
    earnedLeaves: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
