import styles from './MovieGridSkeleton.module.css';

export default function MovieGridSkeleton() {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.posterSkeleton}></div>
          <div className={styles.info}>
            <div className={styles.titleSkeleton}></div>
            <div className={styles.dateSkeleton}></div>
          </div>
        </div>
      ))}
    </div>
  );
}
