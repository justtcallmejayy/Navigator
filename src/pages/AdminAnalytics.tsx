import { BarChart3 } from 'lucide-react';
import styles from './AdminAnalytics.module.scss';

export default function AdminAnalytics() {
  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Analytics</h1>
        <p className={styles.subtitle}>View user engagement and content performance metrics.</p>
      </div>

      <div className={styles.content}>
        <BarChart3 className={styles.icon} />
        <p>Analytics dashboard coming soon...</p>
        <p style={{ fontSize: 'var(--font-size-sm)', marginTop: '1rem' }}>
          You'll be able to track user engagement and platform analytics here.
        </p>
      </div>
    </section>
  );
}
