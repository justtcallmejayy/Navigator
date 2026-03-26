import { useEffect, useState } from 'react';
import styles from './VocabularyHub.module.scss';
import { fetchVocabularyTerms, type VocabularyTerm } from '../lib/queries/vocabulary';

export default function VocabularyHub() {
  const [terms, setTerms] = useState<VocabularyTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('all');
  const [selectedTerm, setSelectedTerm] = useState<VocabularyTerm | null>(null);

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

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelectedTerm(null);
      }
    }

    if (selectedTerm) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [selectedTerm]);

  const filteredTerms = terms.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(search.toLowerCase()) ||
      term.definition.toLowerCase().includes(search.toLowerCase()) ||
      (term.etymology ?? '').toLowerCase().includes(search.toLowerCase());

    const matchesDifficulty =
      difficulty === 'all' || term.difficulty?.toLowerCase() === difficulty;

    return matchesSearch && matchesDifficulty;
  });

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Vocabulary Hub</h1>

      <input
        type="text"
        placeholder="Search terms, definitions, or concepts..."
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
          <button
            key={term.id}
            type="button"
            className={styles.card}
            onClick={() => setSelectedTerm(term)}
          >
            <div className={styles.cardTop}>
              <div className={styles.cardHeader}>
                <span className={`${styles.badge} ${styles[getDifficultyClass(term.difficulty)]}`}>
                  {term.difficulty || 'general'}
                </span>

                {term.pronunciation && (
                  <span className={styles.pronunciation}>/{term.pronunciation}/</span>
                )}
              </div>

              <h3 className={styles.term}>{term.term}</h3>

              <p className={styles.definition}>{truncateText(term.definition, 150)}</p>

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
                  Related: {truncateText(term.related_terms.slice(0, 2).join(', '), 42)}
                  {term.related_terms.length > 2 ? '...' : ''}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {selectedTerm && (
        <div className={styles.modalOverlay} onClick={() => setSelectedTerm(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setSelectedTerm(null)}
              aria-label="Close modal"
            >
              ×
            </button>

            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{selectedTerm.term}</h2>

              <div className={styles.modalMeta}>
                <span
                  className={`${styles.badge} ${styles[getDifficultyClass(selectedTerm.difficulty)]}`}
                >
                  {selectedTerm.difficulty || 'general'}
                </span>

                {selectedTerm.pronunciation && (
                  <span className={styles.modalPronunciation}>
                    /{selectedTerm.pronunciation}/
                  </span>
                )}
              </div>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalSection}>
                <h3>Definition</h3>
                <p>{selectedTerm.definition}</p>
              </div>

              {selectedTerm.etymology && (
                <div className={styles.modalSection}>
                  <h3>Etymology</h3>
                  <p>{selectedTerm.etymology}</p>
                </div>
              )}

              {selectedTerm.example_usage && (
                <div className={styles.modalSection}>
                  <h3>Usage Example</h3>
                  <blockquote className={styles.exampleBox}>
                    “{selectedTerm.example_usage}”
                  </blockquote>
                </div>
              )}

              {selectedTerm.tags.length > 0 && (
                <div className={styles.modalSection}>
                  <h3>Categories</h3>
                  <div className={styles.modalPills}>
                    {selectedTerm.tags.map((tag) => (
                      <span key={tag} className={styles.modalTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedTerm.related_theories.length > 0 && (
                <div className={styles.modalSection}>
                  <h3>Related Theories</h3>
                  <div className={styles.modalPills}>
                    {selectedTerm.related_theories.map((theory) => (
                      <span key={theory} className={styles.modalTheory}>
                        {theory}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedTerm.related_terms.length > 0 && (
                <div className={styles.modalSection}>
                  <h3>Related Terms</h3>
                  <div className={styles.modalPills}>
                    {selectedTerm.related_terms.map((related) => (
                      <span key={related} className={styles.modalRelatedPill}>
                        {related}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.modalFooter}>
                <div className={styles.modalActions}>
                  <button type="button" className={styles.primaryAction}>
                    Study with Flashcards
                  </button>
                  <button type="button" className={styles.secondaryAction}>
                    Explore Theories
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function truncateText(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trim()}...`;
}

function getDifficultyClass(difficulty: string | null): string {
  const normalized = difficulty?.toLowerCase();

  if (normalized === 'beginner') return 'beginner';
  if (normalized === 'intermediate') return 'intermediate';
  if (normalized === 'advanced') return 'advanced';

  return 'general';
}