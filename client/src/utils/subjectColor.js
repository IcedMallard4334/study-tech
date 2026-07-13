const PALETTE = [
  { bg: "#dbeafe", text: "#1d4ed8" },
  { bg: "#dcfce7", text: "#15803d" },
  { bg: "#f3e8ff", text: "#7e22ce" },
  { bg: "#fee2e2", text: "#b91c1c" },
  { bg: "#fef9c3", text: "#a16207" },
  { bg: "#ffedd5", text: "#c2410c" },
  { bg: "#e0e7ff", text: "#4338ca" },
  { bg: "#cffafe", text: "#0e7490" },
];

export function getSubjectColor(subject = "") {
  let hash = 0;
  for (let i = 0; i < subject.length; i++) {
    hash = subject.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % PALETTE.length;
  return PALETTE[index];
}