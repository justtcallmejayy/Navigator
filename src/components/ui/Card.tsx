import type { HTMLAttributes } from 'react';
import styles from './Card.module.scss';

type CardProps = HTMLAttributes<HTMLDivElement>;

export default function Card(props: CardProps) {
  return (
    <div
      {...props}
      className={[styles.card, props.className]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
