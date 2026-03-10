import type { Theory } from '../../types/theory';
import TheoryCard from './TheoryCard';
import styles from './TheoryGrid.module.scss';

type TheoryGridProps = {
  items: Theory[];
};

export default function TheoryGrid({ items }: TheoryGridProps) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <TheoryCard key={item.id} item={item} />
      ))}
    </div>
  );
}
