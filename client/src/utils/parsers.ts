export function parseDateString(string: string): string {
  const dateObj = new Date(string);
  return `${dateObj.toDateString()} at ${dateObj.toTimeString().slice(0, 8)}`;
}