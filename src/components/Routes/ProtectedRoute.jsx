import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { ROUTES } from "../../utils/routes";

const ProtectedRoute = ({children, allow}) => {
    const { status } = useAuth();

    //Wait until Firebase finishes checking authentication.
    if (status === "loading") {
        return <h1>Loading...</h1>;
    }

    //Wrong status? Deny access.
    if (!allow.includes(status)) {

        switch (status) {

            case "unauthenticated":

                return <Navigate to={ROUTES.LANDING} replace />;

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

}

export default ProtectedRoute;