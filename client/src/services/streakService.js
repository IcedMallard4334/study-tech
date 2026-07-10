import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getLocalDateString, getYesterdayString } from "../utils/streak";

export async function recordStreakActivity(uid) {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) return;

  const data = snap.data();
  const today = getLocalDateString();
  const yesterday = getYesterdayString();
  const streak = data.streak || { current: 0, longest: 0, lastActiveDate: null };

  if (streak.lastActiveDate === today) {
    return; // already logged today, nothing to do
  }

  const newCurrent = streak.lastActiveDate === yesterday ? streak.current + 1 : 1;

  await updateDoc(userRef, {
    "streak.current": newCurrent,
    "streak.longest": Math.max(newCurrent, streak.longest || 0),
    "streak.lastActiveDate": today,
  });
}