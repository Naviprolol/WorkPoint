export function isActivePromo(dateFrom: string, dateTo: string): boolean {
  const currentDate = new Date();
  const startDate = new Date(dateFrom);
  const endDate = new Date(dateTo);

  return currentDate >= startDate && currentDate <= endDate;
}
