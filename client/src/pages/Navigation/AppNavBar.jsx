import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import { ROUTES } from "../../utils/routes";

const PATH_TO_KEY = {
  [ROUTES.DASHBOARD]: "home",
  [ROUTES.SUBJECTS]: "subjects",
  [ROUTES.COMMUNITY]: "community",
  [ROUTES.PROFILE]: "profile",
};

const KEY_TO_PATH = {
  home: ROUTES.DASHBOARD,
  subjects: ROUTES.SUBJECTS,
  community: ROUTES.COMMUNITY,
  profile: ROUTES.PROFILE,
};

export default function AppNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const active = PATH_TO_KEY[location.pathname] || "home";

  return (
    <NavBar
      active={active}
      onNavigate={(key) => {
        const path = KEY_TO_PATH[key];
        if (path) navigate(path);
      }}
    />
  );
}