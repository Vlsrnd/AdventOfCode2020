"use script";
//input here data from day-06-data.txt
const str = ``;

const arr = str.split("\n\n");

const partOne = arr
  .map((groupStr) => groupStr.replace(/\s/g, ""))
  .map((groupStr) => new Set([...groupStr]).size)
  .reduce((acc, elem) => acc + elem, 0);

const partTwo = arr
  .map((groupStr) => groupStr.split("\n"))
  .map((group) => {
    return group.reduce(
      (obj, form) => {
        [...form].forEach((char) => {
          if (!obj[char]) obj[char] = 1;
          else obj[char]++;
        });
        return obj;
      },
      { length: group.length }
    );
  })
  .map((group) => {
    const length = group.length;
    delete group.length;
    return Object.entries(group).filter((form) => form[1] === length);
  })
  .reduce((sum, elem) => sum + elem.length, 0);

console.log("Part one answer:", partOne, "\nPart two answer:", partTwo);
