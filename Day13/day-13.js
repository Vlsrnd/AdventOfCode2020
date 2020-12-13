"use script";
const timeStamp = 1002618;
const buses =
  "19,x,x,x,x,x,x,x,x,41,x,x,x,37,x,x,x,x,x,367,x,x,x,x,x,x,x,x," +
  "x,x,x,x,13,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,373,x,x,x,x,x," +
  "x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,23";
const busesArr = buses.split(",");

const partOne = (buses) => {
  const waitingTime = [];
  for (let i = 0; i < buses.length; i++) {
    if (buses[i] === "x") continue;
    waitingTime.push([
      i,
      Math.ceil(timeStamp / buses[i]) * buses[i] - timeStamp,
    ]);
  }
  waitingTime.sort((a, b) => a[1] - b[1]);
  return waitingTime[0][1] * buses[waitingTime[0][0]];
};

const partTwo = (buses) => {
  return buses.map(Number).reduce(
    ({ step, result }, bus, offset) => {
      if (!isNaN(bus)) {
        while ((result + offset) % bus !== 0) {
          result += step;
        }
        step *= bus;
      }
      return { result, step };
    },
    { step: 1, result: 1 }
  ).result;
};

console.log("Part one answer:", partOne(busesArr),
            "\nPart two answer:", partTwo(busesArr));
