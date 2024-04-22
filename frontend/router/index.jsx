import {
  createBrowserRouter,
} from "react-router-dom";
import LandingPage from "../src/LandingPage";
import Auth from "../src/Auth";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    path: "notes",
    element: <div>About</div>,
  },
  {
    path: "auth",
    element: <Auth/>,
  }
]);

export default router
