const express = require("express");
const URL = require("../models/urls");

const router = express.Router();

router.get("/", async (req, res) => {
  console.log(req.user);
  // if (!req.user) return res.redirect("/login");
  const allURL = await URL.find({ createdBy: req.user._id });
  return res.json({
    user: req.user,
    urls: allURL,
  });
});

router.delete("/delete/:shortId", async (req, res) => {
  const { shortId } = req.params;
  try {
    const deletedProject = await URL.findOneAndDelete({ shortId });
    if (!deletedProject) {
      return res.status(404).json({ message: "URL not found." });
    }
    return res
      .status(200)
      .json({ message: "Successfully deleted the URL.", deletedProject });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Failed to delete the URL." });
  }
});

// router.get("/signup", (req, res) => {
//   return res.render("signup");
// });

// router.get("/login", (req, res) => {
//   return res.render("login");
// });

module.exports = router;
