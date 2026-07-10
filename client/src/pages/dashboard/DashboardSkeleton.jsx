import styles from "./Dashboard.module.css";
import skeletonStyles from "./DashboardSkeleton.module.css";

function Bar({ width, height = "1rem", style }) {
  return (
    <div
      className={skeletonStyles.shimmer}
      style={{ width, height, borderRadius: "0.375rem", ...style }}
    />
  );
}

export default function DashboardSkeleton() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <Bar width="14rem" height="1.875rem" style={{ marginBottom: "0.75rem" }} />
            <Bar width="10rem" height="1rem" />
          </div>
          <Bar width="8rem" height="2rem" style={{ borderRadius: "9999px" }} />
        </div>

        <div className={styles.statsRow}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={styles.statCard}>
              <Bar width="2.5rem" height="1.875rem" style={{ margin: "0 auto 0.5rem" }} />
              <Bar width="4rem" height="0.875rem" style={{ margin: "0 auto" }} />
            </div>
          ))}
        </div>

        <div className={styles.continueCard}>
          <div style={{ flex: 1 }}>
            <Bar width="8rem" height="0.75rem" style={{ marginBottom: "0.5rem" }} />
            <Bar width="16rem" height="1.25rem" />
          </div>
          <Bar width="8rem" height="2.75rem" style={{ borderRadius: "0.75rem" }} />
        </div>

        <div className={styles.grid}>
          <div className={styles.panel}>
            <Bar width="8rem" height="1.125rem" style={{ marginBottom: "1rem" }} />
            <Bar width="100%" height="0.875rem" style={{ marginBottom: "0.5rem" }} />
            <Bar width="100%" height="0.5rem" style={{ marginBottom: "1rem" }} />
            <Bar width="100%" height="0.875rem" style={{ marginBottom: "0.5rem" }} />
            <Bar width="100%" height="0.5rem" />
          </div>

          <div className={styles.panelStack}>
            <div className={styles.panel}>
              <Bar width="8rem" height="1.125rem" style={{ marginBottom: "1rem" }} />
              <div className={styles.actionsGrid}>
                {[0, 1, 2, 3].map((i) => (
                  <Bar key={i} width="100%" height="2.75rem" style={{ borderRadius: "0.75rem" }} />
                ))}
              </div>
            </div>
            <div className={styles.panel}>
              <Bar width="8rem" height="1.125rem" style={{ marginBottom: "1rem" }} />
              <Bar width="6rem" height="1.5rem" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}