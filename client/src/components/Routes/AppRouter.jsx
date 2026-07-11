//client/src/components/Routes/AppRouter.jsx

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "../../utils/routes";

// Public pages
import AuthPage from "../../pages/AuthPage/AuthPage";

// Onboarding pages
import WelcomePage from "../../pages/onboarding/WelcomePage";
import CompleteProfile from "../../pages/onboarding/CompleteProfile";
import OnboardingQuiz from "../../pages/onboarding/OnboardingQuiz";



import SubjectsList from "../../pages/Subjects/SubjectsList";
import SubjectTopics from "../../pages/Subjects/SubjectTopics";


import LessonPage from "../../pages/Lesson/LessonPage";


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