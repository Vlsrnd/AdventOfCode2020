"use script";
//input here data from day-11-data.txt
const inputDataStr = ``;


const checkNeighborsPartOne = (indexI, indexJ, data) => {
  let neighbors = 0;
  if (data[indexI - 1]?.[indexJ - 1] === "#") neighbors++;
  if (data[indexI - 1]?.[indexJ] === "#") neighbors++;
  if (data[indexI - 1]?.[indexJ + 1] === "#") neighbors++;
  if (data[indexI][indexJ - 1] === "#") neighbors++;
  if (data[indexI][indexJ + 1] === "#") neighbors++;
  if (data[indexI + 1]?.[indexJ - 1] === "#") neighbors++;
  if (data[indexI + 1]?.[indexJ] === "#") neighbors++;
  if (data[indexI + 1]?.[indexJ + 1] === "#") neighbors++;
  return neighbors;
};

const checkNeighborsPartTwo = (indexI, indexJ, data) => {
  let neighbors = 0;
  //up
  for (let y = indexI - 1; y > -1; y--) {
    if (data[y][indexJ] == "L") break;
    if (data[y][indexJ] == "#") {
      neighbors++;
      break;
    }
  }
  //right
  for (let x = indexJ + 1; x < data[0].length; x++) {
    if (data[indexI][x] == "L") break;
    if (data[indexI][x] == "#") {
      neighbors++;
      break;
    }
  }
  //down
  for (let y = indexI + 1; y < data.length; y++) {
    if (data[y][indexJ] == "L") break;
    if (data[y][indexJ] == "#") {
      neighbors++;
      break;
    }
  }
  //left
  for (let x = indexJ - 1; x > -1; x--) {
    if (data[indexI][x] == "L") break;
    if (data[indexI][x] == "#") {
      neighbors++;
      break;
    }
  }
  //up-left
  for (let x = indexJ - 1, y = indexI - 1; x > -1, y > -1; x--, y--) {
    if (data[y][x] == "L") break;
    if (data[y][x] == "#") {
      neighbors++;
      break;
    }
  }
  //up-right
  for (
    let x = indexJ + 1, y = indexI - 1;
    x < data[0].length, y > -1;
    x++, y--
  ) {
    if (data[y][x] == "L") break;
    if (data[y][x] == "#") {
      neighbors++;
      break;
    }
  }
  //down-right
  for (
    let x = indexJ + 1, y = indexI + 1;
    x < data[0].length, y < data.length;
    x++, y++
  ) {
    if (data[y][x] == "L") break;
    if (data[y][x] == "#") {
      neighbors++;
      break;
    }
  }
  //down-left
  for (let x = indexJ - 1, y = indexI + 1; x > -1, y < data.length; x--, y++) {
    if (data[y][x] == "L") break;
    if (data[y][x] == "#") {
      neighbors++;
      break;
    }
  }
  return neighbors;
};

const findStability = (inputData, checkNeighborsFunc, maxNeighbors) => {
  const arr = inputData.split("\n").map((line) => line.split(""));
  const result = inputData.split("\n").map((line) => line.split(""));

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] === ".") continue;

      let neighbors = checkNeighborsFunc(i, j, arr);

      if (neighbors === 0 && arr[i][j] === "L") result[i][j] = "#";
      if (neighbors >= maxNeighbors && arr[i][j] === "#") result[i][j] = "L";
    }
  }

  if (result.flat().join("") === arr.flat().join("")) {
    return result.flat().filter((place) => place === "#").length;
  }
  return findStability(
    result.map((line) => line.join("")).join("\n"),
    checkNeighborsFunc,
    maxNeighbors
  );
};

console.log(
  "Part one answer:",
  findStability(inputDataStr, checkNeighborsPartOne, 4),
  "\nPart two answer:",
  findStability(inputDataStr, checkNeighborsPartTwo, 5)
);
