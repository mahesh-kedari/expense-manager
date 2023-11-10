export function getFormattedDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function getDateMinusDays(date: Date, days: number) {
  if (days === 0) {
    return date;
  }
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
