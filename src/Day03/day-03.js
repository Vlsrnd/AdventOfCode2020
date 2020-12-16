'use strict';
//input here data from day-03-data.txt
let str = ``;

const arr = str.split('\n');

const treeCounter = (arr, stepX, stepY) => {
  const lineLength = arr[1].length;
  let count = 0;
  for (let x = 0, y = 0; y < arr.length; x += stepX, y += stepY){
    if (x >= lineLength) x -= lineLength;
    if (arr[y].charAt(x) === '#') count++;
  }
  return count;
}

//Part two conditions
const paths = [ [1, 1], 
                [3, 1], 
                [5, 1], 
                [7, 1], 
                [1, 2]];

const partTwo = (arr, pathsArr) => {
  return pathsArr.reduce( (acc, path) => acc * treeCounter(arr, path[0], path[1]), 1);
}

console.log('Part one answer:', treeCounter(arr, 3, 1),
            '\nPart two answer:', partTwo(arr, paths))
