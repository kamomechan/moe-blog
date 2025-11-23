"use client";

// Needs client-side timezone for accurate display.

export default function LocalizedDate({ date }: { date: Date }) {
  const localDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }); // "mm/dd/yyyy, hh:mm:ss"
  const formattedDate = localDate.replace(
    /(\d{2})\/(\d{2})\/(\d{4}),(\s)/,
    `$3-$1-$2$4`
  ); // "yyyy-mm-dd hh:mm:ss"

  const currentDate = new Date();
  const yearDiff = currentDate.getFullYear() - date.getFullYear();

  const dayDiff = Math.floor(
    (currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );
  const hoursDiff = Math.floor(
    (currentDate.getTime() - date.getTime()) / (1000 * 60 * 60)
  );
  let result;
  if (hoursDiff < 24 && date.getDay() === currentDate.getDay()) {
    result = `${formattedDate.slice(11, 16)}`; // hh:mm
  } else if (hoursDiff < 24) {
    result =
      hoursDiff === 1 ? `${hoursDiff} hour ago` : `${hoursDiff} hours ago`;
  } else if (dayDiff < 4) {
    result = dayDiff === 1 ? `${dayDiff} day ago` : `${dayDiff} days ago`;
  } else if (yearDiff === 0) {
    result = formattedDate.slice(5, 10); // mm-dd
  } else {
    result = formattedDate.slice(0, 10);
  }

  return <time dateTime={date.toISOString()}>{result}</time>;
}
