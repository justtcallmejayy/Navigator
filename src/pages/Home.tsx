import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <section className={styles.hero}>
      <p className={styles.kicker}>Film Theory Navigator</p>
      <h1 className={styles.title}>
        Explore <span className={styles.titleAccent}>Film Theory</span> with clarity.
      </h1>
      <p className={styles.body}>
        Browse key film theories, compare thinkers, and dive into examples through a searchable, structured library.
      </p>
      <Link to="/theory" className={styles.cta}>
        Open Theory Library
      </Link>
    </section>
  );
}
