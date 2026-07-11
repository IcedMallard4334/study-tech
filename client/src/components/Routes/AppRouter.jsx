import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "../../utils/routes";

// Public pages
import AuthPage from "../../pages/AuthPage/AuthPage";
import ChooseRole from "../../pages/Onboarding/ChooseRole";

// Onboarding pages
import WelcomePage from "../../pages/Onboarding/WelcomePage";
import CompleteProfile from "../../pages/Onboarding/CompleteProfile";
import OnboardingQuiz from "../../pages/Onboarding/OnboardingQuiz";

// Dashboard
import DashboardContainer from "../../pages/dashboard/DashboardContainer";

const AppRouter = () => {
    return(
        <Routes>

            {/* Public */}

            <Route
                path={ROUTES.LANDING}
                element={<AuthPage />}
            />

            {/*Role */}
            <Route

                path={ROUTES.CHOOSE_ROLE}

                element={

                    <ProtectedRoute

                        allow={["needs-role"]}

                    >

                        <ChooseRole />

                    </ProtectedRoute>

                }

            />

            {/* Welcome */}

            <Route
                path={ROUTES.WELCOME}
                element={
                    <ProtectedRoute allow={["needs-profile"]}>
                        <WelcomePage />
                    </ProtectedRoute>
                }
            />

            {/* Complete Profile */}

            <Route
                path={ROUTES.COMPLETE_PROFILE}
                element={
                    <ProtectedRoute allow={["needs-profile"]}>
                        <CompleteProfile />
                    </ProtectedRoute>
                }
            />

            {/* Quiz */}

            <Route
                path={ROUTES.ONBOARDING}
                element={
                    <ProtectedRoute allow={["needs-onboarding"]}>
                        <OnboardingQuiz />
                    </ProtectedRoute>
                }
            />

            {/* Dashboard */}

            <Route
                path={ROUTES.DASHBOARD}
                element={
                    <ProtectedRoute allow={["ready"]}>
                        <DashboardContainer />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}

export default AppRouter;