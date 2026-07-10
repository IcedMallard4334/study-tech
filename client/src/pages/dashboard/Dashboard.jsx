import { Flame } from "lucide-react";
import styles from "./Dashboard.module.css";

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

export default function Dashboard({
  name,
  learningStyle,
  streakDays = 0,
  stats,
  subjects = [],
  badges = [],
  continueLesson = null,
  onResume = () => {},
  onQuickAction = () => {},
}) {
  const safeStats = stats || {
    lessonsDone: 0,
    subjectsCount: subjects.length,
    questionsAsked: 0,
    quizScore: 0,
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Welcome back{name ? `, ${name}` : ""}</h1>
            <p className={styles.subtitle}>
              Your learning style:{" "}
              <span className={styles.subtitleValue}>
                {learningStyle || "Not set"}
              </span>
            </p>
          </div>
          <div className={styles.streak}>
            <Flame className={styles.streakIcon} fill="currentColor" strokeWidth={0} />
            {streakDays} day streak
          </div>
        </div>

        {/* Stats row */}
        <div className={styles.statsRow}>
          <StatCard value={safeStats.lessonsDone} label="Lessons done" />
          <StatCard value={safeStats.subjectsCount} label="Subjects" />
          <StatCard value={safeStats.questionsAsked} label="Questions asked" />
          <StatCard value={`${safeStats.quizScore}%`} label="Quiz score" />
        </div>

        {/* Continue learning */}
        <div className={styles.continueCard}>
          <div>
            <p className={styles.continueEyebrow}>Continue learning</p>
            {continueLesson ? (
              <>
                <h2 className={styles.continueTitle}>{continueLesson.title}</h2>
                <p className={styles.continueRecommendation}>
                  Recommended: {continueLesson.recommendation}
                </p>
              </>
            ) : (
              <h2 className={styles.continueTitle}>No lessons started yet</h2>
            )}
          </div>
          <button onClick={onResume} className={styles.resumeButton} disabled={!continueLesson}>
            {continueLesson ? "Resume" : "Start learning"}
          </button>
        </div>

        <div className={styles.grid}>
          {/* Subject progress */}
          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>Your subjects</h3>
            {subjects.length > 0 ? (
              subjects.map((s) => (
                <SubjectProgress key={s.name} name={s.name} percent={s.percent} />
              ))
            ) : (
              <p className={styles.continueRecommendation}>
                No subjects added yet.
              </p>
            )}
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
              {badges.length > 0 ? (
                <div className={styles.badgeRow}>
                  {badges.map((b, i) => (
                    <span key={i}>{b}</span>
                  ))}
                </div>
              ) : (
                <p className={styles.continueRecommendation}>
                  No achievements yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}