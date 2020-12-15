"use script";

const solution = (steps) => {
  const obj = {
    18: [0],
    11: [1], 
    9:  [2],
    0:  [3],
    5:  [4],
    1:  [5],
  };
  let indexNum = 6;
  let currentNum = 1;

  while (indexNum < steps){
    if (obj[currentNum].length === 1) {
      if (obj[0].length > 1) obj[0][0] = obj[0][1];
      obj[0][1] = indexNum;
      currentNum = 0;
    } else {
      const delta = obj[currentNum][1] - obj[currentNum][0];
      if (!obj[delta]) obj[delta] = [indexNum];
      else {
        if (obj[delta].length > 1) obj[delta][0] = obj[delta][1];
        obj[delta][1] = indexNum
      }
      currentNum = delta;
    }
    indexNum++;
  }
  return currentNum;
}

//this runs for about 3 minutes :(
console.log("Part one answer:", solution(2020),
            "\nPart two answer:", solution(2020));


//this runs for about 4 sec, but this code isn't my :(
// const execute = () => {
//   const input = [18, 11, 9, 0, 5, 1];

//   let index = 1
//   let map = new Map();
//   let nextnbr;

//   while(index < 30000000){
//       debugger
//       const nbr = (index <= input.length) ? input[index-1] : nextnbr;
//       nextnbr = map.has(nbr) ? index - map.get(nbr) : 0;
//       map.set(nbr, index)

//       index++;
//   }
//   console.log(nextnbr)
// }
