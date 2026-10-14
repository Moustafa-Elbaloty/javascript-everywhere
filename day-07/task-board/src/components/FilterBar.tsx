import type { Filter, Sort } from "../types";

interface FilterBarProps {
  filter: Filter;
  search: string;
  sort: Sort;
  onFilterChange: (filter: Filter) => void;
  onSearchChange: (search: string) => void;
  onSortChange: (sort: Sort) => void;
}

export default function FilterBar({
  filter,
  search,
  sort,
  onFilterChange,
  onSearchChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <section className="filter-bar" aria-label="Task filters">
      <div className="filter-options">
        {(["all", "open", "done"] as Filter[]).map((option) => (
          <button
            key={option}
            type="button"
            className={filter === option ? "filter-button active" : "filter-button"}
            aria-pressed={filter === option}
            onClick={() => onFilterChange(option)}
          >
            {option === "all" ? "All" : option === "open" ? "Open" : "Done"}
          </button>
        ))}
      </div>

      <input
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search tasks..."
        aria-label="Search tasks"
      />

      <label className="sort-control">
        <span>Sort by</span>
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value as Sort)}
          aria-label="Sort tasks"
        >
          <option value="added">Date added</option>
          <option value="priority">Priority</option>
          <option value="title">A–Z</option>
        </select>
      </label>
    </section>
  );
}
