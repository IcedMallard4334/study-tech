import "./AuthPage.css";
import AuthCard from "../../components/Auth/AuthCard";
import { useAuth } from "../../context/useAuth";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import LoadingSpinner from "../../components/LoadingSpinner";

const AuthPage = () => {

    const { status } = useAuth();
    if  (status === "loading") {
        return <LoadingSpinner />;
    }

    if (status === "needs-role") {
        return <Navigate to={ROUTES.CHOOSE_ROLE} replace />;
    }

    if (status === "needs-profile") {
        return <Navigate to={ROUTES.WELCOME} replace />;
    }

    if (status === "needs-onboarding") {
        return <Navigate to={ROUTES.ONBOARDING} replace />;
    }

    if (status === "ready") {
        return <Navigate to={ROUTES.DASHBOARD} replace />;
    }
    return (  
        
        <div className="auth-page">
            {/* Temporary test 
            {
                user
                ?<h2>Welcome {user.displayName}</h2>
                :<h2>Please Sign In</h2>
            }*/}
            <AuthCard />
        </div>
    );
}
 
export default AuthPage;