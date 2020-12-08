"use script";
//input here data from day-08-data.txt
const inputDataStr = ``;

const inputDataArr = inputDataStr
                      .split('\n')
                      .map(operation => operation.split(' '));

const findLoop = (arr) => {
  let acc = 0;
  const stepIndexes = [];
  const result = {};

  for (let i = 0; i < arr.length; i++){
    if (stepIndexes.includes(i)) {
      result.finishAcc = acc;
      result.isFinite = false;
      return result;
    }
    stepIndexes.push(i);
    if (arr[i][0] === 'acc') {
      acc = eval(`${acc}${arr[i][1]}`);
    } else if (arr[i][0] === 'jmp') {
      i = eval(`${i}${arr[i][1]}-1`);
      if (i < 0) break;
    }
  }
  result.finishAcc = acc;
  result.isFinite = true;
  return result;  
};

const partTwo = (startedArr) => {
  for (let i = 0; i < startedArr.length; i++){
    const currentArr = JSON.parse(JSON.stringify(startedArr));
    if (startedArr[i][0] === 'jmp') currentArr[i][0] = 'nop';
    if (startedArr[i][0] === 'nop') currentArr[i][0] = 'jmp';
  
    const currentResult = findLoop(currentArr);
    if (currentResult.isFinite) return currentResult.finishAcc;
  }

  return `this array don't have a decision`;
};


console.log("Part one answer:", findLoop(inputDataArr).finishAcc,
            "\nPart two answer:", partTwo(inputDataArr));