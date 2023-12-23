import { IAd } from "../interfaces/interfaces";

export function isActivePromo(dateFrom: string, dateTo: string): boolean {
  const currentDate = new Date();
  const startDate = new Date(dateFrom);
  const endDate = new Date(dateTo);

  return currentDate >= startDate && currentDate <= endDate;
}

export function checkTime(ad: IAd): void {
  const currentDate = new Date();
  const startDate = new Date(ad.date_from);
  const endDate = new Date(ad.date_to);

  console.log('Место: ', ad.name)
  console.log('Текщее время: ', currentDate)
  console.log('Начальное время: ', startDate)
  console.log('Время окончания: ', endDate)
}
