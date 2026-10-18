// Course deadlines include the full 23:59 minute in Turkey (UTC+03:00).
export function snapshotDeadline(date: string): number {
  return Date.parse(`${date}T23:59:59.999+03:00`);
}

export function activeSnapshotIndex(dates: readonly string[], now: number): number {
  return dates.findIndex(date => now <= snapshotDeadline(date));
}

export function nextSnapshotRefreshDelay(dates: readonly string[], now: number): number {
  const index = activeSnapshotIndex(dates, now);
  return index < 0 ? 60_000 : Math.min(60_000, Math.max(1, snapshotDeadline(dates[index]) - now + 1));
}
