'use strict';

const data = '974618352';

const main = (input, cupsCount, steps) => {
  const cupsArray = input.split('').map(Number);

  const cups = cupsArray.reduce((arr, num, i) => {
    arr[num] = cupsArray[i + 1];
    return arr;
  }, []);

  if (cupsCount > cupsArray.length) {
    cups[cupsArray[cupsArray.length - 1]] = cupsArray.length + 1;
    for (let i = 10; i < cupsCount; i++) {
      cups[i] = i + 1;
    }
  }

  const closureElement = cupsCount <= cupsArray.length ? cupsArray[cupsArray.length - 1] : cupsCount;
  cups[closureElement] = cupsArray[0];

  let currentCup = cupsArray[0];

  for (let i = 0; i < steps; i++) {

    const one = cups[currentCup];
    const two = cups[one];
    const three = cups[two];
    const stash = [one, two, three];
    let destinationCup = currentCup - 1;

    cups[currentCup] = cups[three];

    while (stash.includes(destinationCup) || destinationCup === 0) {
      if (stash.includes(destinationCup)) destinationCup--;
      if (destinationCup === 0) destinationCup = cupsCount;
    }

    cups[three] = cups[destinationCup];
    cups[destinationCup] = one;

    currentCup = cups[currentCup];
  }

  if (cupsCount === 9 && steps === 100) {
    let current = 1;
    let result = [current];
    while (cups[current] !== 1) {
      result.push(current = cups[current]);
    }
    return Number(result.slice(1).join(''));
  }

  return cups[1] * cups[cups[1]];
};

console.log('Part one answer:', main(data, 9, 100), '\nPart two answer:', main(data, 1000000, 10000000));