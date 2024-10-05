import { createBrowserRouter } from "react-router-dom";
import { App } from "./screens/App";
import { Home } from "./screens/Home";
import { Profile } from "screens/Profile";
import { Leaderboards } from "screens/Leaderboards";
import { Courses } from "screens/Courses";

export const routes = [
  { name: "Home", path: "/home", id: 1 },
  { name: "Courses", path: "/courses", id: 4 },
  { name: "Leaderboards", path: "/leaderboards", id: 3 },
  { name: "Profile", path: "/profile", id: 2 },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/leaderboards",
    element: <Leaderboards />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
]);
