export function getDaysLeftnumber(day, month, year) {
  const currentDate = new Date(); // Get the current date
  const eventDate = new Date(year, month - 1, day); // Create a Date object for the event date

  const timeDifference = eventDate.getTime() - currentDate.getTime(); // Calculate the time difference in milliseconds
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days and round up

  return daysDifference;
}
