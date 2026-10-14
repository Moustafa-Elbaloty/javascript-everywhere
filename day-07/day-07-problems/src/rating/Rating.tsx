interface RatingProps {
  value: number;
  max?: number;
  label?: string;
}

function getFilledStars(value: number, max: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  const roundedValue = Math.round(value);

  return Math.max(0, Math.min(roundedValue, max));
}

export function Rating({
  value,
  max = 5,
  label,
}: RatingProps) {
  if (!Number.isInteger(max) || max <= 0) {
    return null;
  }

  const filled = getFilledStars(value, max);
  const empty = max - filled;

  const stars = "★".repeat(filled) + "☆".repeat(empty);

  return (
    <p>
      {label ? `${label}: ` : ""}
      <span
        role="img"
        aria-label={`${filled} out of ${max}`}
      >
        <span aria-hidden="true">{stars}</span>
      </span>
      {` (${filled}/${max})`}
    </p>
  );
}
