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

export function extractCity(input: string): string {
  console.log(input)
  const parts = input.split('-');
  if (parts.length > 1) {
    const cityPart = parts[1].trim();
    const cityParts = cityPart.split('/');
    if (cityParts.length > 0) {
      return cityParts[0].trim();
    }
  }
  return "";
}

export function isEmpty(obj: Object): boolean {
  return Object.keys(obj).length === 0;
}