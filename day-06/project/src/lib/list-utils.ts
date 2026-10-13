// 11.2

export function partition<T, S extends T>(
  items: T[],
  predicate: (
    item: T
  ) => item is S
): [S[], T[]];

export function partition<T>(
  items: T[],
  predicate: (
    item: T
  ) => boolean
): [T[], T[]];

export function partition<T>(
  items: T[],
  predicate: (
    item: T
  ) => boolean
): [T[], T[]] {
  const accepted: T[] = [];
  const rejected: T[] = [];

  for (const item of items) {
    if (predicate(item)) {
      accepted.push(item);
    } else {
      rejected.push(item);
    }
  }

  return [
    accepted,
    rejected
  ];
}