const express = require("express");
const URL = require("../models/urls");

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  console.log(req.user)
  const allURL = await URL.find({ createdBy: req.user._id });
  return res.json( {
    urls: allURL,
  });
});

// router.get("/signup", (req, res) => {
//   return res.render("signup");
// });

// router.get("/login", (req, res) => {
//   return res.render("login");
// });

module.exports= router