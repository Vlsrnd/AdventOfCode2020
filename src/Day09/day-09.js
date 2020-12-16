"use script";
//input here data from day-09-data.txt
const inputDataStr = ``;

const inputDataArr = inputDataStr.split('\n').map(num => +num);

const partOne = (dataArr) => {
  for (let i = 25; i < dataArr.length; i++){
    const numbers25 = dataArr.slice(i - 25, i);
    const deltaArr = numbers25.map(num => dataArr[i] - num);
    const filteredArr = deltaArr.filter(delta => numbers25.includes(delta));
    if (filteredArr.length === 0) return dataArr[i];
  }
}

const partOneResult = partOne(inputDataArr);

function partTwo(dataArr, wrongNum) {
  for (let i = 0; i < dataArr.length; i++){
    for (let j = i + 2; j <= dataArr.length; j++){
      const sum = dataArr.slice(i, j).reduce( (sum, num) => sum + num);
      if (sum > wrongNum) break;
      if (sum === wrongNum) {
        const resultArr = dataArr.slice(i, j)
        return (Math.min(...resultArr) + Math.max(...resultArr));
      }
    }
  }
}

const partTwoResult = partTwo(inputDataArr, partOneResult);

console.log("Part one answer:", partOneResult,
            "\nPart two answer:", partTwoResult);
