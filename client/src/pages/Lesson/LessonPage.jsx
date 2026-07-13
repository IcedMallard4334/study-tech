import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Eye, Headphones, PenLine, Hand } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { getTopicById, getLessonsForTopic, normalizeStyleKey } from "../../services/lessonsService";
import styles from "./Lesson.module.css";

const STYLE_TABS = [
  { key: "visual", label: "Visual", icon: Eye },
  { key: "auditory", label: "Auditory", icon: Headphones },
  { key: "reading_writing", label: "Reading/Writing", icon: PenLine },
  { key: "kinesthetic", label: "Kinesthetic", icon: Hand },
];

export default function LessonPage() {
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

        // Always land on the student's own learning style first, even if
        // no lesson exists there yet — showing the empty state is more
        // honest than silently substituting a different style.
        setActiveStyle(dominantStyle || "visual");
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
      <div className={styles.page}>
        <div className={styles.container}><p className={styles.status}>Loading lesson…</p></div>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={`${styles.status} ${styles.statusError}`}>{error || "This topic couldn't be found."}</p>
        </div>
      </div>
    );
  }

  const activeLesson = lessonsByStyle[activeStyle];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to={`/subjects/${encodeURIComponent(topic.subject)}`} className={styles.backLink}>
          ← {topic.subject}
        </Link>

        <p className={styles.eyebrow}>{topic.subject}</p>
        <h1 className={styles.title}>{topic.title}</h1>

        <div className={styles.stylePills}>
          {STYLE_TABS.map((tab) => {
            const isActive = activeStyle === tab.key;
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                type="button"
                className={`${styles.stylePill} ${isActive ? styles.stylePillActive : ""}`}
                onClick={() => setActiveStyle(tab.key)}
              >
                <Icon className={styles.stylePillIcon} strokeWidth={1.75} />
                {tab.label}
                {dominantStyle === tab.key && <span className={styles.stylePillTag}>for you</span>}
              </button>
            );
          })}
        </div>

        <div className={styles.content}>
          {!activeLesson && (
            <p className={styles.status}>This lesson hasn't been created in this format yet.</p>
          )}
          {activeLesson && !activeLesson.content?.trim() && (
            <p className={styles.status}>Content for this format is coming soon.</p>
          )}
          {activeLesson?.content?.trim() && (
            <div className={styles.body}>{activeLesson.content}</div>
          )}
        </div>
      </div>
    </div>
  );
}