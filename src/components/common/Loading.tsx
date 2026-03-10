import styles from './Loading.module.scss';

type LoadingProps = {
  label?: string;
};

export default function Loading({ label = 'Loading...' }: LoadingProps) {
  return <p className={styles.loading}>{label}</p>;
}
