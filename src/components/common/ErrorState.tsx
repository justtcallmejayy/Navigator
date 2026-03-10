import styles from './ErrorState.module.scss';

type ErrorStateProps = {
  message: string;
};

export default function ErrorState({ message }: ErrorStateProps) {
  return <p className={styles.error}>{message}</p>;
}
