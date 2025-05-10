const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const urlRouter = require("./routes/url");
const homeRouter = require('./routes/home')
const { loggedUserOnly, checkAuth } = require("./middlewares/auth");
const Url = require("./models/urls");

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/url",loggedUserOnly, urlRouter);
app.use("/", checkAuth, homeRouter);
app.use("/user", userRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  try {
    const entry = await Url.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitedHistory: { visitedAt: Date.now() },
        },
      }
    );
    res.redirect(entry.redirectURL);
  } catch (error) {
    console.log(error);
  }
});

mongoose
  .connect("mongodb://localhost:27017/auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connrcted");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB error", err);
  });
