import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { ROUTES } from "../../utils/routes";
import LoadingSpinner from "../../components/LoadingSpinner";

const ProtectedRoute = ({ children, allow }) => {
    const { status } = useAuth();
    if (status === "loading") {
        return <LoadingSpinner />;
    }

    if (!allow.includes(status)) {
        switch (status) {
            case "unauthenticated":
                return <Navigate to={ROUTES.LANDING} replace />;
            
            case "needs-role":

                return <Navigate to={ROUTES.CHOOSE_ROLE} replace />;

            case "needs-profile":
                return <Navigate to={ROUTES.WELCOME} replace />;

            case "needs-onboarding":
                return <Navigate to={ROUTES.ONBOARDING} replace />;
            case "ready":
                return <Navigate to={ROUTES.DASHBOARD} replace />;
            default:
                return <Navigate to={ROUTES.LANDING} replace />;
        }
    }

    return children;
};

export default ProtectedRoute;