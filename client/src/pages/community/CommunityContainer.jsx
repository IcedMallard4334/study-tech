import { useEffect, useMemo, useState } from "react";
import styles from "./Community.module.css";
import PostQuestionForm from "./PostQuestionForm";
import QuestionCard from "./QuestionCard";
import { useUserProfile } from "../../hooks/useUserProfile";
import { getSubjectColor } from "../../utils/subjectColor";
import { useSubjectsList, useTopicsForSubject } from "../../hooks/useCommunity";
import {
  subscribeQuestions,
  subscribeMyResponses,
  getUserRole,
} from "../../services/communityService";
import { auth } from "../../firebase/firebase";
import { CURRICULUMS, GRADES } from "../../utils/curriculum";

const TABS = [
  { key: "all", label: "All questions" },
  { key: "mine", label: "My questions" },
  { key: "responses", label: "My responses" },
];

export default function CommunityContainer() {
  const { profile, loading: profileLoading } = useUserProfile();
  const [tab, setTab] = useState("all");
  const [filterCurriculum, setFilterCurriculum] = useState("");
  const [filterGrade, setFilterGrade] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterTopicId, setFilterTopicId] = useState("");
  const [search, setSearch] = useState("");
  const [questions, setQuestions] = useState([]);
  const [myResponses, setMyResponses] = useState([]);
  const [isVolunteer, setIsVolunteer] = useState(false);

  const profileCurriculum = profile?.academics?.curriculum;
  const profileGrade = profile?.academics?.grade;

  const filterSubjectsList = useSubjectsList(
    filterCurriculum || undefined,
    filterGrade || undefined
  );
  const filterTopics = useTopicsForSubject(
    filterSubject,
    filterCurriculum || undefined,
    filterGrade || undefined
  );

  useEffect(() => {
    if (auth.currentUser) {
      getUserRole(auth.currentUser.uid).then((role) =>
        setIsVolunteer(role === "volunteer")
      );
    }
  }, []);

  useEffect(() => {
    if (tab === "responses") {
      if (!auth.currentUser) return;
      const unsubscribe = subscribeMyResponses(auth.currentUser.uid, setMyResponses);
      return unsubscribe;
    }

    const unsubscribe = subscribeQuestions(
      {
        subject: filterSubject || undefined,
        topicId: filterTopicId || undefined,
        mode: tab === "mine" ? "mine" : undefined,
        uid: auth.currentUser?.uid,
      },
      setQuestions
    );
    return unsubscribe;
  }, [tab, filterSubject, filterTopicId]);

  const filteredQuestions = useMemo(() => {
    let list = questions;
    if (filterCurriculum) {
      list = list.filter((q) => q.curriculum === filterCurriculum);
    }
    if (filterGrade) {
      list = list.filter((q) => q.grade === filterGrade);
    }
    if (search.trim()) {
      const term = search.trim().toLowerCase();
      list = list.filter((q) => q.body?.toLowerCase().includes(term));
    }
    return list;
  }, [questions, filterCurriculum, filterGrade, search]);

  if (profileLoading) {
    return <div style={{ padding: "2.5rem", textAlign: "center" }}>Loading...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.tabRow}>
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`${styles.tabButton} ${tab === t.key ? styles.tabActive : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab !== "responses" && (
          <div className={styles.filterRow}>
            <select
              className={styles.select}
              value={filterCurriculum}
              onChange={(e) => {
                setFilterCurriculum(e.target.value);
                setFilterSubject("");
                setFilterTopicId("");
              }}
            >
              <option value="">All curriculums</option>
              {CURRICULUMS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              className={styles.select}
              value={filterGrade}
              onChange={(e) => {
                setFilterGrade(e.target.value);
                setFilterSubject("");
                setFilterTopicId("");
              }}
            >
              <option value="">All grades</option>
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  Grade {g}
                </option>
              ))}
            </select>

            <select
              className={styles.select}
              value={filterSubject}
              onChange={(e) => {
                setFilterSubject(e.target.value);
                setFilterTopicId("");
              }}
            >
              <option value="">All subjects</option>
              {filterSubjectsList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {filterSubject && filterTopics.length > 0 && (
              <select
                className={styles.select}
                value={filterTopicId}
                onChange={(e) => setFilterTopicId(e.target.value)}
              >
                <option value="">All topics</option>
                {filterTopics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            )}

            <input
              className={styles.searchInput}
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        {tab !== "responses" && (
          <PostQuestionForm
            defaultCurriculum={profileCurriculum}
            defaultGrade={profileGrade}
            currentUser={auth.currentUser}
            authorGrade={profileGrade}
            onPosted={() => {}}
          />
        )}

        {tab === "responses" ? (
          myResponses.length === 0 ? (
            <p className={styles.emptyState}>You haven't answered any questions yet.</p>
          ) : (
            myResponses.map((r) => {
              const color = getSubjectColor(r.questionSubject);
              return (
                <div key={r.id} className={styles.responseCard}>
                  <span
                    className={styles.subjectBadge}
                    style={{ backgroundColor: color.bg, color: color.text }}
                  >
                    {r.questionSubject}
                  </span>

                  <p className={styles.responseContext}>
                    Replying to: <span className={styles.responseContextQuestion}>{r.questionTitle}</span>
                  </p>

                  <p className={styles.responseBody}>{r.body}</p>
                </div>
              );
            })
          )
        ) : filteredQuestions.length === 0 ? (
          <p className={styles.emptyState}>No questions found.</p>
        ) : (
          filteredQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              currentUser={auth.currentUser}
              isVolunteer={isVolunteer}
              currentUserGrade={profileGrade}
            />
          ))
        )}
      </div>
    </div>
  );
}