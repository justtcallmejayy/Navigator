import { Link } from 'react-router-dom';
import type { Theory } from '../../types/theory';
import styles from './TheoryCard.module.scss';

type TheoryCardProps = {
  item: Theory;
};

export default function TheoryCard({ item }: TheoryCardProps) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>
        <Link className={styles.link} to={`/theory/${item.slug}`}>
          {item.title}
        </Link>
      </h3>
      {item.category && <p className={styles.category}>{item.category}</p>}
      <p className={styles.overview}>{item.overview ?? 'No overview yet.'}</p>
    </article>
  );
}
