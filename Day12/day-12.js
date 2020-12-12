"use script";
//input here data from day-12-data.txt
const inputDataStr = ``;

const turn = {
  E: {
    left: { 90: "N", 180: "W", 270: "S" },
    right: { 90: "S", 180: "W", 270: "N" },
  },
  N: {
    left: { 90: "W", 180: "S", 270: "E" },
    right: { 90: "E", 180: "S", 270: "W" },
  },
  W: {
    left: { 90: "S", 180: "E", 270: "N" },
    right: { 90: "N", 180: "E", 270: "S" },
  },
  S: {
    left: { 90: "E", 180: "N", 270: "W" },
    right: { 90: "W", 180: "N", 270: "E" },
  },
};

const partOne = (data) => {
  const arr = data.split("\n");
  let position = [0, 0];
  let direction = "E";

  arr.forEach((step) => {
    const dir = step.charAt(0);
    const value = +step.replace(/\D/g, "");
    switch (dir) {
      case "N":
        position[1] += value;
        break;
      case "S":
        position[1] -= value;
        break;
      case "E":
        position[0] += value;
        break;
      case "W":
        position[0] -= value;
        break;
      case "L":
        direction = turn[direction].left[`${value}`];
        break;
      case "R":
        direction = turn[direction].right[`${value}`];
        break;
      case "F":
        if (direction === "E") position[0] += value;
        if (direction === "W") position[0] -= value;
        if (direction === "N") position[1] += value;
        if (direction === "S") position[1] -= value;
        break;
      default:
        console.error("Wrong input data");
    }
  });

  return Math.abs(position[0]) + Math.abs(position[1]);
};

const partTwo = (data) => {
  const arr = data.split("\n");
  const shipCoord = [0, 0];
  const pointCoord = [10, 1];
  let direction = "E";

  arr.forEach((step) => {
    const dir = step.charAt(0);
    const value = +step.replace(/\D/g, "");
    switch (dir) {
      case "N":
        pointCoord[1] += value;
        break;
      case "S":
        pointCoord[1] -= value;
        break;
      case "E":
        pointCoord[0] += value;
        break;
      case "W":
        pointCoord[0] -= value;
        break;
      case "L":
        direction = turn[direction].left[`${value}`];
        if (value === 90)
          [pointCoord[0], pointCoord[1]] = [-pointCoord[1], pointCoord[0]];
        if (value === 180)
          [pointCoord[0], pointCoord[1]] = [-pointCoord[0], -pointCoord[1]];
        if (value === 270)
          [pointCoord[0], pointCoord[1]] = [pointCoord[1], -pointCoord[0]];
        break;
      case "R":
        direction = turn[direction].right[`${value}`];
        if (value === 90)
          [pointCoord[0], pointCoord[1]] = [pointCoord[1], -pointCoord[0]];
        if (value === 180)
          [pointCoord[0], pointCoord[1]] = [-pointCoord[0], -pointCoord[1]];
        if (value === 270)
          [pointCoord[0], pointCoord[1]] = [-pointCoord[1], pointCoord[0]];
        break;
      case "F":
        shipCoord[0] += value * pointCoord[0];
        shipCoord[1] += value * pointCoord[1];
        break;
      default:
        console.error("Wrong input data");
    }
  });

  return Math.abs(shipCoord[0]) + Math.abs(shipCoord[1]);
};

console.log(
  "Part one answer:",
  partOne(inputDataStr),
  "\nPart two answer:",
  partTwo(inputDataStr)
);
