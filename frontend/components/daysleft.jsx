export function getDaysLeft(day, month, year) {
  const currentDate = new Date(); // Get the current date
  const eventDate = new Date(year, month - 1, day); // Create a Date object for the event date

  const timeDifference = eventDate.getTime() - currentDate.getTime(); // Calculate the time difference in milliseconds
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days and round up

  if (daysDifference === 1) {
    return 'Tomorrow';
  } else if (daysDifference === 0) {
    return 'Today';
  } else if (daysDifference === -1) {
    return 'Yesterday';
  } else if (daysDifference > 1) {
    return `-${daysDifference} days`;
  } else if (daysDifference < -1) {
    return `${Math.abs(daysDifference)} days ago`;
  } else {
    return 'Unknown';
  }
}
