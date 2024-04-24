import {
  createBrowserRouter,
} from "react-router-dom";
import LandingPage from "../src/LandingPage";
import Auth from "../src/Auth";
import Notes from "../src/Notes"
import { Error404Element } from "../src/ErrorElement";
import AuthGuard from "../src/AuthGuard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    path: "notes",

    element: <AuthGuard><Notes/></AuthGuard>,
  },
  {
    path: "auth",
    element: <Auth/>,
  },
  {
    path: "*",
    element: <Error404Element/>
  }
]);

export default router
