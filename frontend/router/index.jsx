import {
  createBrowserRouter,
} from "react-router-dom";
import LandingPage from "../src/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: LandingPage(),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "auth",
    element: <div>Auth</div>,
  }
]);

export default router