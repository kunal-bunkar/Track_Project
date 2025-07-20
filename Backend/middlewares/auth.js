const { getUser } = require("../service/auth");

async function loggedUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) {
    return res.status(401).json({ message: "Unauthorized: No session found" });
  }

  const user = await getUser(userUid);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized: Invalid session" });
  }

  req.user = user;
  next();
}

module.exports = { loggedUserOnly };
