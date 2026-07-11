import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { getTopicById, getLessonsForTopic, normalizeStyleKey } from "../../services/lessonsService";
import Card from "../../components/common/Card/Card";
import "./Lesson.css";

const STYLE_TABS = [
  { key: "visual", label: "Visual" },
  { key: "auditory", label: "Auditory" },
  { key: "reading_writing", label: "Reading/Writing" },
  { key: "kinesthetic", label: "Kinesthetic" },
];

const LessonPage = () => {
  const { topicId } = useParams();
  const { profile } = useAuth();

  const [topic, setTopic] = useState(null);
  const [lessonsByStyle, setLessonsByStyle] = useState({});
  const [activeStyle, setActiveStyle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dominantStyle = profile?.preferences?.learningStyle?.dominant || null;

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const [topicData, lessons] = await Promise.all([
          getTopicById(topicId),
          getLessonsForTopic(topicId),
        ]);

        if (!isMounted) return;

        setTopic(topicData);

        const map = {};
        lessons.forEach((lesson) => {
          const key = normalizeStyleKey(lesson.learningStyle);
          if (key) map[key] = lesson;
        });
        setLessonsByStyle(map);

        // Default to the student's own learning style if a lesson exists
        // for it; otherwise fall back to the first style that has content.
        const preferredFirst = dominantStyle && map[dominantStyle] ? dominantStyle : null;
        const firstAvailable = STYLE_TABS.find((s) => map[s.key])?.key;
        setActiveStyle(preferredFirst || firstAvailable || "visual");
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Couldn't load this lesson right now.");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => { isMounted = false; };
  }, [topicId, dominantStyle]);

  if (loading) {
    return (
      <div className="lesson-page">
        <Card><p className="lesson-status">Loading lesson…</p></Card>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="lesson-page">
        <Card><p className="lesson-status lesson-status--error">{error || "This topic couldn't be found."}</p></Card>
      </div>
    );
  }

  const activeLesson = lessonsByStyle[activeStyle];

  return (
    <div className="lesson-page">
      <Card>
        <Link to={`/subjects/${encodeURIComponent(topic.subject)}`} className="lesson-back-link">
          ← {topic.subject}
        </Link>

        <p className="lesson-eyebrow">{topic.subject}</p>
        <h1>{topic.title}</h1>

        <div className="style-pills">
          {STYLE_TABS.map((tab) => {
            const hasLesson = Boolean(lessonsByStyle[tab.key]);
            return (
              <button
                key={tab.key}
                type="button"
                className={`style-pill ${activeStyle === tab.key ? "style-pill--active" : ""} ${!hasLesson ? "style-pill--empty" : ""}`}
                onClick={() => setActiveStyle(tab.key)}
              >
                {tab.label}
                {dominantStyle === tab.key && <span className="style-pill__tag">for you</span>}
              </button>
            );
          })}
        </div>

        <div className="lesson-content">
          {!activeLesson && (
            <p className="lesson-status">
              This lesson hasn't been created in this format yet.
            </p>
          )}
          {activeLesson && !activeLesson.content?.trim() && (
            <p className="lesson-status">
              Content for this format is coming soon.
            </p>
          )}
          {activeLesson?.content?.trim() && (
            <div className="lesson-body">{activeLesson.content}</div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default LessonPage;