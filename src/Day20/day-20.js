"use script";
//input here data from day-20-data.txt
const inputDataStr = ``;


class satelliteImage {
  constructor(data) {
    const arr = data.split('\n');
    this.id = arr[0].replace(/\D/g, '');
    const image = arr
      .slice(1)
      .map(line => line
        .replace(/\./g, '0')
        .replace(/#/g, '1'));
    const [top, right, bottom, left] = [
      image[0],
      image.reduce((side, line) => side + line[line.length - 1], ''),
      image[image.length - 1],
      image.reduce((side, line) => side + line[0], '')
    ];
    this.rightDirection = [top, right, bottom.split('').reverse().join(''), left.split('').reverse().join('')]
      .map(line => {
        let test = parseInt(line, 2);
        return test
      });
    this.leftDirection = [top.split('').reverse().join(''), left, bottom, right.split('').reverse().join('')]
      .map(line => {
        let test = parseInt(line, 2)
        return test
      });
  }
}

const data = inputDataStr.split('\n\n').map(image => new satelliteImage(image));

const partOne = (data) => {
  let variants = new Map();
  for (const image of data) {
    for (const side of [...image.rightDirection, ...image.leftDirection]) {
      if (!variants.has(side)) variants.set(side, 1);
      else variants.set(side, variants.get(side) + 1);
    }
  }
  const unique = [];
  for (let value of variants) {
    if (value[1] === 1) unique.push(value[0]);
  }
  let result = data.reduce((acc, img) => {
    const validatedSide = img.rightDirection.filter(value => unique.includes(value)).length;
    if (validatedSide === 2) acc *= img.id;
    return acc;
  }, 1);

  return result;
};


console.log("Part one answer:", partOne(data), "\nPart two answer:", '...in progress');