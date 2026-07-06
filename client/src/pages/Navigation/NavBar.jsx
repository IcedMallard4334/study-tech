import { Home, BookOpen, Search, MessageCircle, User, Lightbulb } from "lucide-react";
import styles from "./NavBar.module.css";

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: Home },
  { key: "subjects", label: "Subjects", icon: BookOpen },
  { key: "search", label: "Search", icon: Search },
  { key: "community", label: "Community", icon: MessageCircle },
  { key: "profile", label: "Profile", icon: User },
];

export default function NavBar({ active = "home", onNavigate = () => {} }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Lightbulb className={styles.brandIcon} fill="currentColor" strokeWidth={1.5} />
          <span className={styles.brandText}>StewardTech</span>
        </div>

        <div className={styles.navList}>
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
            const isActive = key === active;
            return (
              <button
                key={key}
                onClick={() => onNavigate(key)}
                className={`${styles.navButton} ${isActive ? styles.navButtonActive : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  className={`${styles.icon} ${isActive ? styles.iconActive : ""}`}
                  strokeWidth={1.75}
                />
                <span className={`${styles.label} ${isActive ? styles.labelActive : ""}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}