import URLs from "./inputs/URLs"
import Header from "./Header"
import Main from "./Main"
import Login from "./inputs/Login"
import Signup from "./inputs/Signup"

const Home = () => {
  return (
    <div>
      <Header></Header>
      {/* <Signup/> */}
      {/* <Login/> */}
      <URLs/>
      <Main/>
    </div>
  )
}

export default Home