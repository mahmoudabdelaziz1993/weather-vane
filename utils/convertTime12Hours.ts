/**
 * Converts a time from 24-hour format to 12-hour format.
 * 
 * @param {string} time - The time in 24-hour format (HH:mm).
 * @returns {string} - The time in 12-hour format (h:mm AM/PM).
 */ 
export default function convertTime(time: string): string {
  let hours: number = parseInt(time.split(':')[0]);
  let minutes: string = time.split(':')[1];
  let ampm: string = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return hours + ':' + minutes + ' ' + ampm;
}
  