const Url = require("../models/urls");
const { nanoid } = require("nanoid");

async function handleURL(req, res) {
  try {
    const { url } = req.body;
    if (!url || typeof url !== "string") {
      return res.status(400).json({
        message: "Invalid URL input",
      });
    }
    const shortId = nanoid(8);
    const newURL = await Url.create({
      shortId: shortId,
      redirectURL: url,
      visitHistory: [],
      createdBy: req.user._id,
    });
    return res.status(200).json({
      message: "URL created successfully",
      data: newURL,
    });
  } catch (error) {
    console.log("Something went worng", error);
  }
}

async function handleAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await Url.findOne({ shortId });
  return res.json({
    totalClicks: result.visitedHistory.length,
    analytics: result.visitedHistory,
  });
}

module.exports = { handleURL, handleAnalytics };
