import { createBrowserRouter } from "react-router-dom";
import { App } from "./screens/App";
import { Home } from "./screens/Home";
import { Profile } from "screens/Profile";
import { Leaderboards } from "screens/Leaderboards";
import { Courses } from "screens/Courses";
import { CourseDetails } from "screens/Details/Details";
import { CoursePlayer } from "screens/Course/Course";

export const routes = [
  { name: "Home", path: "/home", id: 1 },
  { name: "Courses", path: "/courses", id: 4 },
  { name: "Achievements", path: "/achievements", id: 3 },
  { name: "Leaderboards", path: "/leaderboards", id: 3 },
  { name: "Profile", path: "/profile", id: 2 },
];

export const adminRoutes = [
  { name: "Admin Home", path: "/admin", id: 1 },
  { name: "Course Editor", path: "/admin/courses", id: 4 },
  // { name: "Leaderboards", path: "/admin/leaderboards", id: 3 },
  // { name: "Profile", path: "/admin/profile", id: 2 },
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
  {
    path: "/courses/:id",
    element: <CourseDetails />,
  },
  {
    path: "/course/:id",
    element: <CoursePlayer />,
  },
  {
    path: "/admin",
    element: <Home />,
  },
  // {
  //   path: "test",
  //   element: <Demo />,
  // },
]);
