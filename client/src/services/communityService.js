import {
  collection,
  collectionGroup,
  addDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

/* ---------- Reference data ---------- */

export async function getSubjectsList(curriculum, grade) {
  const q = query(
    collection(db, "subjects"),
    where("curriculum", "==", curriculum),
    where("grade", "==", String(grade))
  );
  const snap = await getDocs(q);
  if (snap.empty) return [];
  return snap.docs[0].data().subjects || [];
}

export async function getTopicsForSubject(subject, curriculum, grade) {
  if (!subject) return [];
  const q = query(
    collection(db, "topics"),
    where("subject", "==", subject),
    where("curriculum", "==", curriculum),
    where("grade", "==", Number(grade)), // topics.grade is stored as a number
    orderBy("order", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getUserRole(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return "student";
  return snap.data()?.account?.role || "student";
}

/* ---------- Questions feed ---------- */

export function subscribeQuestions({ subject, topicId, mode, uid }, callback, onError) {
  const constraints = [];
  if (subject) constraints.push(where("subject", "==", subject));
  if (topicId) constraints.push(where("topicId", "==", topicId));
  if (mode === "mine") constraints.push(where("authorId", "==", uid));
  constraints.push(orderBy("createdAt", "desc"));

  const q = query(collection(db, "questions"), ...constraints);

  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    (err) => {
      console.error("Error loading questions:", err);
      onError?.(err);
    }
  );
}

export function subscribeMyResponses(uid, callback, onError) {
  const q = query(
    collectionGroup(db, "answers"),
    where("authorId", "==", uid),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    (err) => {
      console.error("Error loading your responses:", err);
      onError?.(err);
    }
  );
}

export function subscribeAnswers(questionId, callback) {
  const q = query(
    collection(db, "questions", questionId, "answers"),
    orderBy("createdAt", "asc")
  );
  return onSnapshot(q, (snap) =>
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  );
}

/* ---------- Writes ---------- */

export async function postQuestion({
  subject,
  topicId = null,
  topicTitle = null,
  curriculum,
  grade,
  body,
  user,
  authorGrade = null,
}) {
  await addDoc(collection(db, "questions"), {
    subject,
    topicId,
    topicTitle,
    curriculum,
    grade: String(grade),
    body,
    authorId: user.uid,
    authorName: user.displayName || "Anonymous",
    authorGrade,
    status: "open",
    answeredByVolunteer: false,
    answerCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function postAnswer({
  questionId,
  questionSubject,
  questionTitle,
  body,
  user,
  isVolunteer,
  authorGrade = null,
}) {
  await addDoc(collection(db, "questions", questionId, "answers"), {
    body,
    authorId: user.uid,
    authorName: user.displayName || "Anonymous",
    authorGrade,
    isVolunteer,
    questionId,
    questionSubject,
    questionTitle,
    createdAt: serverTimestamp(),
  });

  await updateDoc(doc(db, "questions", questionId), {
    status: "answered",
    answerCount: increment(1),
    updatedAt: serverTimestamp(),
    ...(isVolunteer ? { answeredByVolunteer: true } : {}),
  });
}