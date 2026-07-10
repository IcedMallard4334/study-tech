import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "../../utils/routes";

// Public pages
import AuthPage from "../../pages/AuthPage/AuthPage";

// Onboarding pages
import WelcomePage from "../../pages/onboarding/WelcomePage";
import CompleteProfile from "../../pages/onboarding/CompleteProfile";
import OnboardingQuiz from "../../pages/onboarding/OnboardingQuiz";

// Dashboard
//import Dashboard from "../../pages/dashboard/Dashboard";


const AppRouter = () => {
    return(
        <Routes>

            {/* Public */}

            <Route

                path={ROUTES.LANDING}

                element={<AuthPage />}

            />

            {/* Welcome */}

            <Route

                path={ROUTES.WELCOME}

                element={

                    <ProtectedRoute

                        allow={["needs-profile"]}

                    >

                        <WelcomePage />

                    </ProtectedRoute>

                }

            />

            {/* Complete Profile */}

            <Route

                path={ROUTES.COMPLETE_PROFILE}

                element={

                    <ProtectedRoute

                        allow={["needs-profile"]}

                    >

                        <CompleteProfile />

                    </ProtectedRoute>

                }

            />

            {/* Quiz */}

            <Route

                path={ROUTES.ONBOARDING}

                element={

                    <ProtectedRoute

                        allow={["needs-onboarding"]}

                    >

                        <OnboardingQuiz />

                    </ProtectedRoute>

                }

            />

            {/* Dashboard 

            <Route

                path={ROUTES.DASHBOARD}

                element={

                    <ProtectedRoute

                        allow={["ready"]}

                    >

                        <Dashboard />

                    </ProtectedRoute>

                }

            />*/}

        </Routes>

    );

}

export default AppRouter;