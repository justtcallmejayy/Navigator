import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { ErrorState, Loading } from '../components/common';
import { fetchTheoryBySlug } from '../lib/queries/theories';
import styles from './TheoryDetail.module.scss';

export default function TheoryDetail() {
  const { slug = '' } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['theory', slug],
    queryFn: () => fetchTheoryBySlug(slug),
    enabled: Boolean(slug),
  });

  if (isLoading) return <Loading label="Loading theory..." />;
  if (error) return <ErrorState message="Theory could not be loaded." />;
  if (!data) return <ErrorState message="Theory not found." />;

  return (
    <article className={styles.article}>
      <Link to="/theory" className={styles.backLink}>
        Back to library
      </Link>
      <h1 className={styles.title}>{data.title}</h1>
      <p className={styles.overview}>{data.overview}</p>
      {data.history && (
        <section>
          <h2 className={styles.historyTitle}>History</h2>
          <p className={styles.historyText}>{data.history}</p>
        </section>
      )}
    </article>
  );
}
