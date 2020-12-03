'use strict';
//input here data from day-02-data.txt
const dataString = ``;

const dataArr = dataString.split('\n')
                          .map(element => element.split(/\-|\s|\:\s/));
const partOne = dataArr.filter(element => {
  const pass = element[3];
  const match = pass.match(new RegExp(element[2], 'g'))
  if (!match) return false;
  if (match.length >= element[0] && match.length <= element[1]) return true;
  return false;
})
const resultPartOne = partOne.length;

const partTwo = dataArr.filter(element => {
  const pass = element[3];
  const firstCheckedChar = pass.charAt(element[0] - 1);
  const secondCheckedChar = pass.charAt(element[1] - 1);
  const target = element[2];
  if (firstCheckedChar === target && secondCheckedChar !== target || 
      firstCheckedChar !== target && secondCheckedChar === target ) return true;
  return false;
})
const resultPartTwo = partTwo.length;

console.log('Part one answer:', resultPartOne, '\nPart two answer:', resultPartTwo)