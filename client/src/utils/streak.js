export function getLocalDateString(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getYesterdayString() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return getLocalDateString(d);
}

// Recompute what the streak actually is *right now*, since the stored
// number only updates when the user acts — if they've been away for
// 2+ days, the stored value is stale and the real streak is 0.
export function getDisplayStreak(streak) {
  if (!streak?.lastActiveDate) return 0;
  const today = getLocalDateString();
  const yesterday = getYesterdayString();
  if (streak.lastActiveDate === today || streak.lastActiveDate === yesterday) {
    return streak.current || 0;
  }
  return 0;
}