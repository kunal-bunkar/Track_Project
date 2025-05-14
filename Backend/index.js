const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const urlRouter = require("./routes/url");
const homeRouter = require("./routes/home");
const { loggedUserOnly } = require("./middlewares/auth");
const Url = require("./models/urls");
const cors = require('cors')

const app = express();
const corsOptions = {
  origin:'http://localhost:5173',
  credentials:true
}
app.use(cors(corsOptions))
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/", loggedUserOnly, homeRouter);
app.use("/user", userRoute);
app.use("/url", loggedUserOnly, urlRouter);

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
