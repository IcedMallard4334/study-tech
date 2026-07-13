import { useEffect, useState } from "react";
import { Lightbulb, GraduationCap } from "lucide-react";
import styles from "./Community.module.css";
import { subscribeAnswers, postAnswer } from "../../services/communityService";
import { getSubjectColor } from "../../utils/subjectColor";

export default function QuestionCard({ question, currentUser, isVolunteer, currentUserGrade }) {
  const [answers, setAnswers] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeAnswers(question.id, setAnswers);
    return unsubscribe;
  }, [question.id]);

  const handleReply = async () => {
    const trimmed = replyText.trim();
    if (!trimmed || !currentUser) return;

    setSubmitting(true);
    try {
      await postAnswer({
        questionId: question.id,
        questionSubject: question.subject,
        questionTitle: question.body,
        body: trimmed,
        user: currentUser,
        isVolunteer,
        authorGrade: currentUserGrade || null,
      });
      setReplyText("");
    } catch (err) {
      console.error("Error posting answer:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const color = getSubjectColor(question.subject);
  const isAnswered = question.status === "answered";

  return (
    <div className={styles.questionCard}>
        <div className={styles.questionMeta}>
            <div>
                <span
                className={styles.subjectBadge}
                style={{ backgroundColor: color.bg, color: color.text }}
                >
                {question.subject}
                </span>
                <div className={styles.topicLabel}>
                {question.topicTitle && question.topicTitle}
                {question.topicTitle && question.grade && " · "}
                {question.grade && `Grade ${question.grade}`}
                </div>
            </div>

            <span
                className={`${styles.statusBadge} ${
                isAnswered ? styles.statusAnswered : styles.statusOpen
                }`}
            >
                {isAnswered && question.answeredByVolunteer && (
                <Lightbulb size={14} strokeWidth={2} />
                )}
                {isAnswered ? "Answered" : "Unanswered"}
            </span>
        </div>

        <h3 className={styles.questionBody}>{question.body}</h3>
        <p className={styles.questionSub}>
        Asked by {question.authorName} · {question.answerCount || 0}{" "}
        {question.answerCount === 1 ? "answer" : "answers"}
        </p>

      {answers.length > 0 && (
        <div className={styles.answerList}>
          {answers.map((a) => (
            <div key={a.id} className={styles.answerItem}>
              <div className={styles.avatar}>
                {a.authorName?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div className={styles.answerContent}>
                <div className={styles.answerHeader}>
                  <span className={styles.answerName}>{a.authorName}</span>
                  {a.authorGrade && (
                    <span className={styles.gradeLabel}>Grade {a.authorGrade}</span>
                  )}
                  {a.isVolunteer && (
                    <span className={styles.volunteerBadge}>
                      <GraduationCap size={12} strokeWidth={2} />
                      Volunteer tutor
                    </span>
                  )}
                </div>
                <p className={styles.answerBody}>{a.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.replyRow}>
        <input
          className={styles.replyInput}
          placeholder="Write a reply"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleReply()}
        />
        <button
          className={styles.replyButton}
          onClick={handleReply}
          disabled={submitting || !replyText.trim()}
        >
          Reply
        </button>
      </div>
    </div>
  );
}