import { useEffect, useState } from 'react';
import styles from './VocabularyHub.module.scss';
import { fetchVocabularyTerms, type VocabularyTerm } from '../lib/queries/vocabulary';

export default function VocabularyHub() {
  const [terms, setTerms] = useState<VocabularyTerm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTerms() {
      try {
        const data = await fetchVocabularyTerms();
        setTerms(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadTerms();
  }, []);

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Vocabulary Hub</h1>

      {loading && <p>Loading...</p>}

      {!loading && terms.length === 0 && <p>No vocabulary terms found.</p>}

      <div>
        {terms.map((term) => (
          <div key={term.id}>
            <h3>{term.term}</h3>
            <p>{term.definition}</p>
          </div>
        ))}
      </div>
    </section>
  );
}