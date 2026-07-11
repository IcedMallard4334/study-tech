import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import Card from "../../components/common/Card/Card";
import "./Subjects.css";

// Icon + color "role" per subject. Color roles map to CSS vars with
// fallbacks (see Subjects.css) — once global theme vars exist, these
// automatically pick them up.
const SUBJECT_STYLE = {
  "Mathematics": { icon: "➗", role: 1 },
  "Physical Sciences": { icon: "🧪", role: 2 },
  "Life Sciences": { icon: "🌿", role: 3 },
  "English": { icon: "📖", role: 4 },
  "Accounting": { icon: "💰", role: 5 },
  "Mathematical Literacy": { icon: "🔢", role: 6 },
  "Business Studies": { icon: "💼", role: 7 },
  "Geography": { icon: "🌍", role: 8 },
  "History": { icon: "🏛️", role: 9 },
  "Life Orientation": { icon: "🧭", role: 10 },
  "Information Technology": { icon: "💻", role: 11 },
};
const DEFAULT_STYLE = { icon: "📘", role: "default" };

const SubjectsList = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const subjects = profile?.academics?.subjects || [];

  return (
    <div className="subjects-page">
      <Card>
        <h1>Your subjects</h1>

        {subjects.length === 0 ? (
          <p className="subjects-empty">
            No subjects found on your profile yet. Please complete your academic profile.
          </p>
        ) : (
          <div className="subjects-grid">
            {subjects.map((subjectName) => {
              const style = SUBJECT_STYLE[subjectName] || DEFAULT_STYLE;
              return (
                <button
                  key={subjectName}
                  type="button"
                  className={`subject-card subject-card--role-${style.role}`}
                  onClick={() => navigate(`/subjects/${encodeURIComponent(subjectName)}`)}
                >
                  <span className="subject-card__icon" aria-hidden="true">{style.icon}</span>
                  <span className="subject-card__name">{subjectName}</span>
                </button>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default SubjectsList;