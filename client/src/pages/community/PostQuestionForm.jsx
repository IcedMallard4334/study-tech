import { useState } from "react";
import styles from "./Community.module.css";
import { useSubjectsList, useTopicsForSubject } from "../../hooks/useCommunity";
import { postQuestion } from "../../services/communityService";
import { CURRICULUMS, GRADES } from "../../utils/curriculum";

export default function PostQuestionForm({
  defaultCurriculum,
  defaultGrade,
  currentUser,
  authorGrade,
  onPosted,
}) {
  const [curriculum, setCurriculum] = useState(defaultCurriculum || CURRICULUMS[0]);
  const [grade, setGrade] = useState(defaultGrade || GRADES[2]);
  const [subject, setSubject] = useState("");
  const [topicId, setTopicId] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const subjectsList = useSubjectsList(curriculum, grade);
  const topics = useTopicsForSubject(subject, curriculum, grade);

  const handleSubmit = async () => {
    const trimmed = body.trim();
    if (!trimmed || !subject || !currentUser) return;

    setSubmitting(true);
    try {
      const selectedTopic = topics.find((t) => t.id === topicId);
      await postQuestion({
        subject,
        topicId: topicId || null,
        topicTitle: selectedTopic?.title || null,
        curriculum,
        grade,
        body: trimmed,
        user: currentUser,
        authorGrade,
      });
      setBody("");
      setTopicId("");
      onPosted?.();
    } catch (err) {
      console.error("Error posting question:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.postCard}>
      <p className={styles.postEyebrow}>Ask the community</p>

      <div className={styles.filterRow} style={{ marginBottom: 0 }}>
        <select
          className={styles.select}
          value={curriculum}
          onChange={(e) => {
            setCurriculum(e.target.value);
            setSubject("");
            setTopicId("");
          }}
        >
          {CURRICULUMS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className={styles.select}
          value={grade}
          onChange={(e) => {
            setGrade(e.target.value);
            setSubject("");
            setTopicId("");
          }}
        >
          {GRADES.map((g) => (
            <option key={g} value={g}>
              Grade {g}
            </option>
          ))}
        </select>
      </div>

      <select
        className={styles.select}
        value={subject}
        onChange={(e) => {
          setSubject(e.target.value);
          setTopicId("");
        }}
        disabled={subjectsList.length === 0}
      >
        <option value="">
          {subjectsList.length === 0 ? "No subjects available" : "Select a subject"}
        </option>
        {subjectsList.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {subjectsList.length === 0 && (
        <p className={styles.hintText}>
          No subjects found for {curriculum} Grade {grade} yet.
        </p>
      )}

      {subject && topics.length > 0 && (
        <select
          className={styles.select}
          value={topicId}
          onChange={(e) => setTopicId(e.target.value)}
        >
          <option value="">Select a topic (optional)</option>
          {topics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
      )}

      <textarea
        className={styles.textarea}
        placeholder="What are you stuck on?"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
      />

      <button
        className={styles.postButton}
        onClick={handleSubmit}
        disabled={submitting || !body.trim() || !subject}
      >
        Post question
      </button>
    </div>
  );
}