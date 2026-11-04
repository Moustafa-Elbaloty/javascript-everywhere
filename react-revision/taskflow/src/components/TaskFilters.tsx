import type { TaskStatus } from '../types/task'

export type SortOption = 'default' | 'title' | 'dueDate'
export type StatusFilter = 'All' | TaskStatus

interface TaskFiltersProps {
  activeFilter: StatusFilter
  onFilterChange: (filter: StatusFilter) => void
  sortOption: SortOption
  onSortChange: (option: SortOption) => void
}

function TaskFilters({
  activeFilter,
  onFilterChange,
  sortOption,
  onSortChange,
}: TaskFiltersProps) {
  const filters: StatusFilter[] = [
    'All',
    'Todo',
    'In Progress',
    'Done',
  ]

  return (
    <div className="task-filters" aria-label="Task filters and sorting">
      <div className="task-filter-buttons" aria-label="Filter by status">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`filter-button ${
              activeFilter === filter ? 'active' : ''
            }`}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <label className="sort-control">
        <span>Sort by</span>

        <select
          value={sortOption}
          onChange={(event) =>
            onSortChange(event.target.value as SortOption)
          }
          aria-label="Sort tasks"
        >
          <option value="default">Default</option>
          <option value="title">Title A-Z</option>
          <option value="dueDate">Due date</option>
        </select>
      </label>
    </div>
  )
}

export default TaskFilters
