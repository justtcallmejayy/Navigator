import styles from './TheoryFilters.module.scss';

type TheoryFiltersProps = {
  query: string;
  onQueryChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
};

export default function TheoryFilters({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  categories,
}: TheoryFiltersProps) {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder="Search by title..."
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <select
        className={styles.select}
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="">All categories</option>
        {categories.map((entry) => (
          <option key={entry} value={entry}>
            {entry}
          </option>
        ))}
      </select>
    </div>
  );
}
