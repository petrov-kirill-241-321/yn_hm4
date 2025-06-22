export function getDateFromDay(dayOfYear: number): string {
  if (dayOfYear < 1 || dayOfYear > 365) {
    throw new Error("День года должен быть в диапазоне 1-365");
  }

  const months = [
    { name: "Январь", days: 31 },
    { name: "Февраль", days: 28 },
    { name: "Март", days: 31 },
    { name: "Апрель", days: 30 },
    { name: "Май", days: 31 },
    { name: "Июнь", days: 30 },
    { name: "Июль", days: 31 },
    { name: "Август", days: 31 },
    { name: "Сентябрь", days: 30 },
    { name: "Октябрь", days: 31 },
    { name: "Ноябрь", days: 30 },
    { name: "Декабрь", days: 31 },
  ];

  let remainingDays = dayOfYear;
  let monthIndex = 0;

  while (remainingDays > months[monthIndex].days) {
    remainingDays -= months[monthIndex].days;
    monthIndex++;
  }

  return `${remainingDays} ${months[monthIndex].name}`;
}
