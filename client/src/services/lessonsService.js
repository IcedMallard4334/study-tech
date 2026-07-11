import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getTopicById = async (topicId) => {
  const ref = doc(db, "topics", topicId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
};

export const getLessonsForTopic = async (topicId) => {
  const lessonsRef = collection(db, "lessons");
  const q = query(lessonsRef, where("topicId", "==", topicId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// Normalizes whatever casing/spacing a lesson's learningStyle field uses
// (e.g. "Visual", "Reading Writing") down to the same keys the quiz uses:
// visual, auditory, reading_writing, kinesthetic.
export const normalizeStyleKey = (rawStyle) => {
  if (!rawStyle) return null;
  return rawStyle.trim().toLowerCase().replace(/\s+/g, "_");
};