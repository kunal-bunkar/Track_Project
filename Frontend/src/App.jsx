import "./App.css";
import { createBrowserRouter,RouterProvider } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/inputs/Login";
import Signup from "./components/inputs/Signup";

function App() {
  const appRouter = createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/signup',
      element:<Signup/>
    }
  ])
  return (
    <>
    <RouterProvider router={appRouter}/>
    </>
  );
}

export default App;
