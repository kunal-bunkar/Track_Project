import { useState } from "react"
import URLs from "./inputs/URLs"
import Header from "./Header"
import Main from "./Main"
import Login from "./inputs/Login"
import Signup from "./inputs/Signup"



const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn && <Header />}
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <>
          <URLs />
          <Main />
        </>
      )}
    </div>
  );
};

export default Home;