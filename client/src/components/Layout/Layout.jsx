import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NavBar from "../../pages/Navigation/NavBar";

const PATH_TO_KEY = {
  "/dashboard": "home",
  "/subjects": "subjects",
  "/community": "community",
  "/profile": "profile",
};

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const KEY_TO_PATH = {
    home: "/dashboard",
    subjects: "/subjects",
    community: "/community",
    profile: "/profile",
  };

  // Matches "/subjects" and also "/subjects/Mathematics" to the same tab
  const activeKey =
    Object.entries(PATH_TO_KEY).find(([path]) =>
      location.pathname.startsWith(path)
    )?.[1] || "home";

  return (
    <>
      <NavBar active={activeKey} onNavigate={(key) => navigate(KEY_TO_PATH[key])} />
      <Outlet />
    </>
  );
}