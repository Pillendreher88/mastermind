import { useEffect, useRef } from 'react';

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const months = [{ value: "1", label: "January" },
{ value: "2", label: "February" },
{ value: "3", label: "March" },
{ value: "4", label: "April" },
{ value: "5", label: "May" },
{ value: "6", label: "June" },
{ value: "7", label: "July" },
{ value: "8", label: "August" },
{ value: "9", label: "September" },
{ value: "10", label: "October" },
{ value: "11", label: "November" },
{ value: "12", label: "December" }];

export const getMonthOptions = (intervall, year) => {

  let { start, end } = intervall;
  if (!end) end = new Date();

  const startYear = start.getFullYear();
  const startMonth = start.getMonth();
  const endYear = end.getFullYear();
  const endMonth = end.getMonth();
  if (year < startYear) return [];
  else if (year === startYear) return months.filter((month) => month.value > startMonth);
  else if (endYear === year) return months.filter((month) => month.value <= endMonth + 1);
  else return months;
}

export const getYearOptions = (intervall) => {
  let { start, end } = intervall;
  if (!end) end = new Date().getFullYear();

  let options = [end.toString()];
  let option = end - 1;
  while (option >= start) {
    options.push(option.toString());
    option--;
  }
  return options;
}


