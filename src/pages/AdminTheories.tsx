import { Plus } from 'lucide-react';
import styles from './AdminTheories.module.scss';

export default function AdminTheories() {
  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Theories</h1>
        <p className={styles.subtitle}>Create, edit, and publish film theory concepts.</p>
      </div>

      <div className={styles.content}>
        <Plus className={styles.icon} />
        <p>Theories management coming soon...</p>
        <p style={{ fontSize: 'var(--font-size-sm)', marginTop: '1rem' }}>
          You'll be able to create and manage film theory content here.
        </p>
      </div>
    </section>
  );
}
