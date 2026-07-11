import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getTopicsForSubject = async ({ curriculum, grade, subject }) => {
  const topicsRef = collection(db, "topics");
  const q = query(
    topicsRef,
    where("curriculum", "==", curriculum),
    where("grade", "==", Number(grade)), // grade is a string on the user doc, but an int on topics — cast it
    where("subject", "==", subject),
    orderBy("order", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};