export function utcToWeekDay(date) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = new Date(date).getUTCDay();
  return weekdays[day];
}

export function utcToDateString(date) {
  return new Date(date).toDateString().split(" ").splice(1, 3).join(" ");
}
