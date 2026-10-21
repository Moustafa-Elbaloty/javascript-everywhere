interface HeaderProps {
  remaining: number;
}

export default function Header({ remaining }: HeaderProps) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">STAY ORGANIZED</p>
        <h1>Task Board</h1>
        <p className="subtitle">Small steps. Real progress.</p>
      </div>

      <div className="remaining-badge" aria-live="polite">
        <strong>{remaining}</strong>
        <span>remaining</span>
      </div>
    </header>
  );
}
