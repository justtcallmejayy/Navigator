import styles from './EmptyState.module.scss';

type EmptyStateProps = {
  message: string;
};

export default function EmptyState({ message }: EmptyStateProps) {
  return <p className={styles.state}>{message}</p>;
}
