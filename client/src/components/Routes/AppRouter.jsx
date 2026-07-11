//client/src/components/Routes/AppRouter.jsx

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "../../utils/routes";
import Layout from "../Layout/Layout";

// Public pages
import AuthPage from "../../pages/AuthPage/AuthPage";
import ChooseRole from "../../pages/Onboarding/ChooseRole";

// Onboarding pages
import WelcomePage from "../../pages/Onboarding/WelcomePage";
import CompleteProfile from "../../pages/Onboarding/CompleteProfile";
import OnboardingQuiz from "../../pages/Onboarding/OnboardingQuiz";

import SubjectsList from "../../pages/Subjects/SubjectsList";
import SubjectTopics from "../../pages/Subjects/SubjectTopics";

import LessonPage from "../../pages/Lesson/LessonPage";

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
                    <ProtectedRoute allow={["needs-role"]}>
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

            {/* Pages that show the nav bar */}
            <Route element={<Layout />}>

                <Route
                    path={ROUTES.DASHBOARD}
                    element={
                        <ProtectedRoute allow={["ready"]}>
                            <DashboardContainer />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path={ROUTES.SUBJECTS}
                    element={
                        <ProtectedRoute allow={["ready"]}>
                            <SubjectsList />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path={`${ROUTES.SUBJECTS}/:subjectName`}
                    element={
                        <ProtectedRoute allow={["ready"]}>
                            <SubjectTopics />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path={ROUTES.LESSON}
                    element={
                        <ProtectedRoute allow={["ready"]}>
                            <LessonPage />
                        </ProtectedRoute>
                    }
                />

            </Route>

        </Routes>
    );
}

export default AppRouter;