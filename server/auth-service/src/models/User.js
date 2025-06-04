// File: auth-service/models/User.js
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
    sickLeaves: { type: Number, default: 7 },
    casualLeaves: { type: Number, default: 5 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);



// // File: auth-service/models/User.js
// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true ,lowercase:true,trim:treu},
//     password: { type: String, required: true },
//     role: { type: String, enum: ["User", "Admin"], default: "User" },
//     dateOfJoining: { type: Date, required: true },
//     earnedLeaves: { type: Number, default: 0 },
// sickLeaves: { type: Number, default: 7 },  // NEW
// casualLeaves: { type: Number, default: 5 } // NEW

//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);
