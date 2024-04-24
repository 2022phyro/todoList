import {
  createBrowserRouter,
} from "react-router-dom";
import LandingPage from "../src/LandingPage";
import Auth from "../src/Auth";
import Notes from "../src/Notes"
import { Error404Element, ErrorElement } from "../src/ErrorElement";
import AuthGuard from "../src/AuthGuard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
    errorElement: <ErrorElement/>
  },
  {
    path: "notes",
    element: <AuthGuard><Notes/></AuthGuard>,
    errorElement: <ErrorElement/>
  },
  {
    path: "auth",
    element: <Auth/>,
    errorElement: <ErrorElement/>
  },
  {
    path: "*",
    element: <Error404Element/>,
    errorElement: <ErrorElement/>
  }
]);

export default router
