const { log } = require("console");

const startMonth = 5;

const startYear = 2024;

const n = 5;

const monthDiff = startMonth - n;
const yearDiff = Math.trunc(Math.abs(monthDiff) / 12) + +(monthDiff <= 0);
//console.log(`Math.trunc(${n} / 12) ` + Math.trunc(n / 12));
console.log("dif = " + yearDiff);
const monthEnd = monthDiff > 0 ? monthDiff : 12 + (monthDiff % 12);
const yearEnd = +startYear - yearDiff;

console.log("m=" + monthEnd + " y= " + yearEnd);

monthsByNumbers = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

console.log("m= " + monthsByNumbers[monthEnd] + " y= " + yearEnd);
