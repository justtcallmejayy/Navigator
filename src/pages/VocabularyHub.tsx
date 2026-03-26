import { useEffect, useState } from 'react';
import styles from './VocabularyHub.module.scss';
import { fetchVocabularyTerms, type VocabularyTerm } from '../lib/queries/vocabulary';

export default function VocabularyHub() {
  const [terms, setTerms] = useState<VocabularyTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('all');

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

  const filteredTerms = terms.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(search.toLowerCase()) ||
      term.definition.toLowerCase().includes(search.toLowerCase());

    const matchesDifficulty =
      difficulty === 'all' || term.difficulty?.toLowerCase() === difficulty;

    return matchesSearch && matchesDifficulty;
  });

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Vocabulary Hub</h1>

      <input
        type="text"
        placeholder="Search terms..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
      />

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className={styles.filter}
      >
        <option value="all">All Levels</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      {loading && <p>Loading...</p>}

      {!loading && terms.length === 0 && <p>No vocabulary terms found.</p>}

      {!loading && (
        <p className={styles.results}>
          Showing {filteredTerms.length} term{filteredTerms.length === 1 ? '' : 's'}
        </p>
      )}

      <div className={styles.list}>
        {filteredTerms.map((term) => (
          <div key={term.id} className={styles.card}>
            <div>
              <h3 className={styles.term}>{term.term}</h3>

              <p className={styles.definition}>{truncateText(term.definition, 120)}</p>

              {term.tags.length > 0 && (
                <div className={styles.tags}>
                  {term.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                  {term.tags.length > 2 && (
                    <span className={styles.tagMuted}>+{term.tags.length - 2}</span>
                  )}
                </div>
              )}

              {term.related_terms.length > 0 && (
                <p className={styles.related}>
                  Related: {truncateText(term.related_terms.slice(0, 2).join(', '), 40)}
                  {term.related_terms.length > 2 ? '...' : ''}
                </p>
              )}
            </div>

            {term.difficulty && (
              <span className={styles.difficulty}>{term.difficulty}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function truncateText(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trim()}...`;
}