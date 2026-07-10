import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import DashboardSkeleton from "./DashboardSkeleton";
import NavBar from "../Navigation/NavBar";
import { useUserProfile } from "../../hooks/useUserProfile";
import { getDisplayStreak } from "../../utils/streak";
import { recordStreakActivity } from "../../services/streakService";
import { auth } from "../../firebase/firebase";

function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function DashboardContainer() {
  const { profile, loading, error } = useUserProfile();
  const navigate = useNavigate();

  if (loading) {
    return (
      <>
        <NavBar />
        <DashboardSkeleton />
      </>
    );
  }

  if (error || !profile) {
    return (
      <>
        <NavBar />
        <div style={{ padding: "2.5rem", textAlign: "center" }}>
          Couldn't load your profile. {error}
        </div>
      </>
    );
  }

  const firstName = profile.personal?.fullName?.split(" ")[0];
  const learningStyle = capitalize(profile.preferences?.learningStyle?.dominant);
  const streakDays = getDisplayStreak(profile.streak);

  const subjects = (profile.academics?.subjects || []).map((subjectName) => ({
    name: subjectName,
    percent: 0,
  }));

  const stats = {
    lessonsDone: 0,
    subjectsCount: subjects.length,
    questionsAsked: 0,
    quizScore: 0,
  };

  return (
    <>
      <NavBar />

      <Dashboard
        name={firstName}
        learningStyle={learningStyle}
        streakDays={streakDays}
        stats={stats}
        subjects={subjects}
        onResume={() => navigate("/lesson")}
        onQuickAction={(key) => {
          if (key === "study") navigate("/study");
          if (key === "quiz") navigate("/quiz");
          if (key === "stats") navigate("/stats");
          if (key === "timer") navigate("/timer");
        }}
      />
    </>
  );
}