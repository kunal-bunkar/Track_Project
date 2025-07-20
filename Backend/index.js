require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoute = require("./routes/user");
const urlRouter = require("./routes/url");
const homeRouter = require("./routes/home");
const { loggedUserOnly } = require("./middlewares/auth");
const Url = require("./models/urls");

const app = express();

// CORS config for frontend
const corsOptions = {
  origin: process.env.CLIENT_URL, // Now coming from .env
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/user", userRoute);
app.use("/", loggedUserOnly, homeRouter);
app.use("/url", loggedUserOnly, urlRouter);

// Redirect short URL
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  try {
    const entry = await Url.findOneAndUpdate(
      { shortId },
      {
        $push: { visitedHistory: { visitedAt: Date.now() } },
      }
    );

    if (entry) {
      return res.redirect(entry.redirectURL);
    } else {
      return res.status(404).send("Short URL not found");
    }
  } catch (error) {
    console.error("Redirect error:", error);
    return res.status(500).send("Server error");
  }
});

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
