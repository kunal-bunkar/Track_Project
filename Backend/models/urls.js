const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    project_name: {
      type: String,
      required: true,
      unique: true,
    },
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitedHistory: [
      {
        visitedAt: { type: Date, default: Date.now },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
