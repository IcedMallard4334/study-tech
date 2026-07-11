import { useNavigate } from "react-router-dom";
import {
  Calculator, FlaskConical, Leaf, BookOpen, Wallet,
  Sigma, Briefcase, Globe2, Landmark, Compass, Monitor, BookMarked,
} from "lucide-react";
import { useAuth } from "../../context/useAuth";
import styles from "./Subjects.module.css";

const SUBJECT_STYLE = {
  "Mathematics": { icon: Calculator, bg: "#dbeafe", fg: "#2563eb" },
  "Physical Sciences": { icon: FlaskConical, bg: "#fce7f3", fg: "#be185d" },
  "Life Sciences": { icon: Leaf, bg: "#dcfce7", fg: "#16a34a" },
  "English": { icon: BookOpen, bg: "#fef3c7", fg: "#b45309" },
  "Accounting": { icon: Wallet, bg: "#ede9fe", fg: "#7c3aed" },
  "Mathematical Literacy": { icon: Sigma, bg: "#dbeafe", fg: "#2563eb" },
  "Business Studies": { icon: Briefcase, bg: "#fce7f3", fg: "#be185d" },
  "Geography": { icon: Globe2, bg: "#dcfce7", fg: "#16a34a" },
  "History": { icon: Landmark, bg: "#fef3c7", fg: "#b45309" },
  "Life Orientation": { icon: Compass, bg: "#ede9fe", fg: "#7c3aed" },
  "Information Technology": { icon: Monitor, bg: "#dbeafe", fg: "#2563eb" },
};
const DEFAULT_STYLE = { icon: BookMarked, bg: "#f5f5f4", fg: "#78716c" };

export default function SubjectsList() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const subjects = profile?.academics?.subjects || [];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Your subjects</h1>

        {subjects.length === 0 ? (
          <p className={styles.status}>
            No subjects found on your profile yet. Please complete your academic profile.
          </p>
        ) : (
          <div className={styles.subjectsGrid}>
            {subjects.map((subjectName) => {
              const style = SUBJECT_STYLE[subjectName] || DEFAULT_STYLE;
              const Icon = style.icon;
              return (
                <button
                  key={subjectName}
                  type="button"
                  className={styles.subjectCard}
                  onClick={() => navigate(`/subjects/${encodeURIComponent(subjectName)}`)}
                >
                  <span className={styles.subjectIconWrap} style={{ background: style.bg, color: style.fg }}>
                    <Icon strokeWidth={1.75} />
                  </span>
                  <span className={styles.subjectName}>{subjectName}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}