import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { getTopicsForSubject } from "../../services/topicsService";
import Card from "../../components/common/Card/Card";
import "./Subjects.css";

const SubjectTopics = () => {
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
    <div className="subjects-page">
      <Card>
        <Link to="/subjects" className="subjects-back-link">← All subjects</Link>
        <h1>{subjectName}</h1>

        {loading && <p className="subjects-status">Loading topics…</p>}
        {error && <p className="subjects-status subjects-status--error">{error}</p>}
        {!loading && !error && topics.length === 0 && (
          <p className="subjects-status">No topics have been added for this subject yet.</p>
        )}

        <ul className="topics-list">
          {topics.map((topic) => (
            <li key={topic.id} className="topic-row">
              <button
                type="button"
                className="topic-row__button"
                onClick={() => navigate(`/lesson/${topic.id}`)}
              >
                {topic.title}
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default SubjectTopics;