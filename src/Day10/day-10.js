"use script";
//input here data from day-10-data.txt
const inputDataStr = ``;

const inputDataArr = [0, ...inputDataStr.split('\n')
                                        .map(num => +num)
                                        .sort((a, b) => a - b)];
inputDataArr.push(Math.max(...inputDataArr) + 3);

const partOne = (dataArr) => {
  const joltageDifference = [false, 0, 0, 0];
  for (let i = 1; i < dataArr.length; i++) {
      joltageDifference[inputDataArr[i] - inputDataArr[i - 1]]++;
  }
  return joltageDifference[1] * joltageDifference[3];
}

function partTwo(dataArr) {
  const result = dataArr.reduce( (variants, num, index, dataArr) => {
    for (let i = index + 1; i < dataArr.length; i++){
      if (dataArr[i] - num <= 3){
        if (variants[i] === undefined) {
          variants[i] = 0
        }
        variants[i] += variants[index];
      } else break;
    }
    return variants;
  }, [1]);
  return result[result.length - 1];
}

console.log("Part one answer:", partOne(inputDataArr),
            "\nPart two answer:", partTwo(inputDataArr));