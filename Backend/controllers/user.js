const { v4: uuidv4 } = require("uuid");
const Users = require("../models/users");
const { setUser, removeUser } = require("../service/auth");

async function handleUser(req, res) {
  try {
    const { name, email, password } = req.body;

    const newUser = await Users.create({
      name,
      email,
      password,
    });
    return res.status(200).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("Somthing went error ", error);
  }
}

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;

    const existUser = await Users.findOne({
      email,
      password,
    });
    if (!existUser) {
      // Redirect to login page is panding
      return res.status(401).json({
        message: "Invalid Username or password",
      });
    }
    const sessionId = uuidv4();
    setUser(sessionId, existUser);
    res.cookie("uid", sessionId, {
      httpOnly: true, // Helps prevent XSS
      secure: false, // Set to true in production with HTTPS
      sameSite: "Lax", // Helps CSRF protection
    });
    return res.status(200).json({ message: "Login successful" });

    // return res.redirect('/')
  } catch (error) {
    console.log("Somthing went error ", error);
  }
}

async function handleLogout(req, res) {
  try {
    const sessionId = req.cookies.uid;
    if (!sessionId) {
      return res.status(400).json({ message: "No active session." });
    }
    removeUser(sessionId);

    res.clearCookie("uid", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    return res.status(200).json({
      message: "Logout successfully",
    });
  } catch (error) {
    console.log("Error during logout", error);
    return res.status(500).json({
      message: "Something went wrong during logout",
    });
  }
}

module.exports = { handleUser, handleLogin, handleLogout };
