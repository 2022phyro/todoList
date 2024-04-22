import {
  createBrowserRouter,
} from "react-router-dom";
import LandingPage from "../src/LandingPage";
import Auth from "../src/Auth";
import Notes from "../src/Notes"
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    path: "notes",
    element: <Notes/>,
  },
  {
    path: "auth",
    element: <Auth/>,
  }
]);

export default router
