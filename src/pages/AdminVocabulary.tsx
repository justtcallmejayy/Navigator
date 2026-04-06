import { Plus } from 'lucide-react';
import styles from './AdminVocabulary.module.scss';

export default function AdminVocabulary() {
  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Manage Vocabulary</h1>
        <p className={styles.subtitle}>Create and edit vocabulary terms and definitions.</p>
      </div>

      <div className={styles.content}>
        <Plus className={styles.icon} />
        <p>Vocabulary management coming soon...</p>
        <p style={{ fontSize: 'var(--font-size-sm)', marginTop: '1rem' }}>
          You'll be able to manage vocabulary terms and definitions here.
        </p>
      </div>
    </section>
  );
}
