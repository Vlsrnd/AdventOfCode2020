'use strict';
//input here data from day-01-data.txt
const data = [];

//remove definetely not suitable elements
const sorted = data.sort((a,b) => a - b);
const filtred = sorted.filter(elem => elem < 2020 - sorted[0] - sorted[1]);

//make new arr with difference
const mapped = filtred.map(elem => 2020 - elem);

const resultPartOne = mapped.filter( elem => data.includes(elem) )
                            .reduce( (acc, elem) => acc * elem, 1 );

let resultPartTwo = null;

for (let i = 0; i < filtred.length; i++) {
  for (let j = i + 1; j < filtred.length; j ++) {
    if (mapped.includes(filtred[i] + filtred[j])){
      resultPartTwo = filtred[i] * filtred[j] * ( 2020 - filtred[i] - filtred[j] );
      break;
    }
    if (resultPartTwo) break;
  }
  if(resultPartTwo) break;
}
console.log('Part one answer:', resultPartOne, '\nPart two answer:', resultPartTwo)