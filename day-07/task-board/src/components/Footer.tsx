interface FooterProps {
  total: number;
  completed: number;
  onClearCompleted: () => void;
}

export default function Footer({
  total,
  completed,
  onClearCompleted,
}: FooterProps) {
  const remaining = total - completed;

  return (
    <footer className="app-footer">
      <p>
        <strong>{total}</strong> total ·{" "}
        <strong>{completed}</strong> completed ·{" "}
        <strong>{remaining}</strong> remaining
      </p>

      <button
        type="button"
        className="clear-completed"
        onClick={onClearCompleted}
        disabled={completed === 0}
      >
        Clear completed
      </button>
    </footer>
  );
}
