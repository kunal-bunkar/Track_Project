import { useState } from "react";
import URL from "./inputs/URLs";
import Header from "./Header";
import Main from "./Main";
import Login from "./inputs/Login";
import Signup from "./inputs/Signup";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // Toggle between login/signup

  return (
    <>
    <Header/>
    <URL/>
    <Main/>
    </>
  );
};

export default Home;
