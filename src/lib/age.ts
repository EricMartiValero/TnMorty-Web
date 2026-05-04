export function getAgeFromBirthdate(birthdateISO: string, now = new Date()): number {
  const [yearStr, monthStr, dayStr] = birthdateISO.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return 0;

  let age = now.getFullYear() - year;
  const m = now.getMonth() + 1;
  const d = now.getDate();
  if (m < month || (m === month && d < day)) age -= 1;

  return Math.max(0, age);
}

