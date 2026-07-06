import { Flame } from "lucide-react";
import styles from "./HomePage.module.css";

const DEFAULT_SUBJECTS = [
  { name: "Math", percent: 62 },
  { name: "Physics", percent: 41 },
  { name: "Chemistry", percent: 78 },
  { name: "Geography", percent: 50 },
];

const DEFAULT_STATS = {
  lessonsDone: 23,
  subjectsCount: 4,
  questionsAsked: 7,
  quizScore: 85,
};

const DEFAULT_BADGES = ["🏆", "📗", "🔥", "💡"];

const QUICK_ACTIONS = [
  { key: "study", label: "Study" },
  { key: "quiz", label: "Quiz" },
  { key: "stats", label: "Stats" },
  { key: "timer", label: "Timer" },
];

function StatCard({ value, label }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

function SubjectProgress({ name, percent }) {
  return (
    <div className={styles.subjectRow}>
      <div className={styles.subjectHeader}>
        <span className={styles.subjectName}>{name}</span>
        <span className={styles.subjectPercent}>{percent}%</span>
      </div>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default function HomePage({
  name = "Lesedi",
  learningStyle = "visual",
  streakDays = 6,
  stats = DEFAULT_STATS,
  subjects = DEFAULT_SUBJECTS,
  badges = DEFAULT_BADGES,
  continueLesson = {
    title: "Simultaneous equations",
    recommendation: "diagram walkthrough",
  },
  onResume = () => {},
  onQuickAction = () => {},
}) {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Welcome back, {name}</h1>
            <p className={styles.subtitle}>
              Your learning style: <span className={styles.subtitleValue}>{learningStyle}</span>
            </p>
          </div>
          <div className={styles.streak}>
            <Flame className={styles.streakIcon} fill="currentColor" strokeWidth={0} />
            {streakDays} day streak
          </div>
        </div>

        {/* Stats row */}
        <div className={styles.statsRow}>
          <StatCard value={stats.lessonsDone} label="Lessons done" />
          <StatCard value={stats.subjectsCount} label="Subjects" />
          <StatCard value={stats.questionsAsked} label="Questions asked" />
          <StatCard value={`${stats.quizScore}%`} label="Quiz score" />
        </div>

        {/* Continue learning */}
        <div className={styles.continueCard}>
          <div>
            <p className={styles.continueEyebrow}>Continue learning</p>
            <h2 className={styles.continueTitle}>{continueLesson.title}</h2>
            <p className={styles.continueRecommendation}>
              Recommended: {continueLesson.recommendation}
            </p>
          </div>
          <button onClick={onResume} className={styles.resumeButton}>
            Resume
          </button>
        </div>

        <div className={styles.grid}>
          {/* Subject progress */}
          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>Your subjects</h3>
            {subjects.map((s) => (
              <SubjectProgress key={s.name} name={s.name} percent={s.percent} />
            ))}
          </div>

          {/* Quick actions + badges */}
          <div className={styles.panelStack}>
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>Quick actions</h3>
              <div className={styles.actionsGrid}>
                {QUICK_ACTIONS.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => onQuickAction(key)}
                    className={styles.actionButton}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>Achievements</h3>
              <div className={styles.badgeRow}>
                {badges.map((b, i) => (
                  <span key={i}>{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}