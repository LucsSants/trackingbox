export function formatDate(date: string) {
  const months = [
    'jan', 'fev', 'mar', 'abr',
    'mai', 'jun', 'jul', 'ago',
    'set', 'out', 'nov', 'dez'
  ];

  const dateParts = date.split('/');
  const day = dateParts[0];
  const monthsIndex = parseInt(dateParts[1]) - 1;

  return `${day}/${months[monthsIndex]}`
} 


export function formatHour(hour : string) {
  const hoursArray = hour.trim().split('');
  
  return `${hoursArray[0]}${hoursArray[1]}:${hoursArray[2]}${hoursArray[3]}`
}