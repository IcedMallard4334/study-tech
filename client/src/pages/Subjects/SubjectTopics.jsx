import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { getTopicsForSubject } from "../../services/topicsService";
import styles from "./Subjects.module.css";

export default function SubjectTopics() {
  const { subjectName: encoded } = useParams();
  const subjectName = decodeURIComponent(encoded);
  const { profile } = useAuth();
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!profile?.academics) return;

    let isMounted = true;
    (async () => {
      try {
        const fetched = await getTopicsForSubject({
          curriculum: profile.academics.curriculum,
          grade: profile.academics.grade,
          subject: subjectName,
        });
        if (isMounted) setTopics(fetched);
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Couldn't load topics right now.");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => { isMounted = false; };
  }, [profile, subjectName]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/subjects" className={styles.backLink}>← All subjects</Link>
        <h1 className={styles.title}>{subjectName}</h1>

        {loading && <p className={styles.status}>Loading topics…</p>}
        {error && <p className={`${styles.status} ${styles.statusError}`}>{error}</p>}
        {!loading && !error && topics.length === 0 && (
          <p className={styles.status}>No topics have been added for this subject yet.</p>
        )}

        <ul className={styles.topicsList}>
          {topics.map((topic) => (
            <li key={topic.id}>
              <button
                type="button"
                className={styles.topicRow}
                onClick={() => navigate(`/lesson/${topic.id}`)}
              >
                <span className={styles.topicTitle}>{topic.title}</span>
                <ChevronRight className={styles.topicArrow} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}