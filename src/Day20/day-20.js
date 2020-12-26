"use script";
//input here data from day-20-data.txt
const inputDataStr = ``;

const reverse = (line) => line.split('').reverse().join('');
const symbolToBinar = (line) => parseInt(line.replaceAll('.', '0').replaceAll('#', '1'), 2);

const topSide = (tile) => tile[0];
const bottomSide = (tile) => tile[tile.length - 1];
const leftSide = (tile) => tile.map((x) => x[0]).join('');
const rightSide = (tile) => tile.map((x) => x[x.length - 1]).join('');

const flip = (tile) => tile.map((line) => line.split('').reverse().join(''));
const rotate = (tile) => tile
  .map((row, i) => [...tile]
    .reverse()
    .map(line => line[i])
    .join('')
  );

const getSides = (tile) => {
  return [
      topSide(tile),
      bottomSide(tile),
      leftSide(tile),
      rightSide(tile),
      reverse(bottomSide(tile)),
      reverse(topSide(tile)),
      reverse(rightSide(tile)),
      reverse(leftSide(tile))
    ]
    .map(symbolToBinar);
};

const data = inputDataStr
  .split('\n\n')
  .map(tile => {
    let [id, ...lines] = tile.split('\n');
    id = Number(id.match(/\d+/g)[0])
    return {
      id,
      tile: lines,
      borders: getSides([...lines]),
    }
  });

const borderId = {};
data.forEach(({id, borders}) => {
  borders.forEach((x) => borderId[x] = borderId[x] ? [...borderId[x], id] : [id]);
});

const neighborsId = new Map();
for (let id in borderId) {
  const border = borderId[id];
  if (border.length === 2) {
    const neighbors = border.map((id) => neighborsId.get(id) || new Set());
    neighborsId.set(border[0], neighbors[0].add(border[1]));
    neighborsId.set(border[1], neighbors[1].add(border[0]));
  }
}
const corners = Array.from(neighborsId.entries())
    .filter(neighbors => neighbors[1].size === 2)
    .map(n => n[0]);


const partOne = (corners) => corners.reduce((a, b) => a * b, 1);

const partTwo = (input, corners) => {
  let image = [];
  const corner = input.find((tile) => tile.id === corners[0]);
  corner.tile = flip(corner.tile);

  let [i, j] = [0, 0];
  image[0] = [corner.tile];

  while (true) {
    while (true) {
      const right = symbolToBinar(rightSide(image[j][i]));
      const next = input.find(tile => tile.borders.includes(right));
      if (!next) break;
      input.splice(input.indexOf(next), 1)
      if (next.borders.indexOf(right) > 3) {
        next.borders = next.borders.slice(4);
        next.tile = rotate(rotate(next.tile));
      }
      if (next.borders[0] === right) next.tile = flip(rotate(next.tile));
      if (next.borders[1] === right) next.tile = rotate(next.tile);
      if (next.borders[3] === right) next.tile = flip(next.tile);
      image[j][i + 1] = next.tile;
      i++;
    }

    i = 0;
    const bottom = symbolToBinar(bottomSide(image[j][i]));
    const next = input.find((x) => x.borders.includes(bottom));
    if (!next) break;
    input.splice(input.indexOf(next), 1)
    if (next.borders.indexOf(bottom) > 3) {
      next.borders = next.borders.slice(4);
      next.tile = rotate(rotate(next.tile));
    }
    if (next.borders[1] === bottom) next.tile = flip(rotate(rotate(next.tile)));
    if (next.borders[2] === bottom) next.tile = flip(rotate(next.tile));
    if (next.borders[3] === bottom) next.tile = rotate(rotate(rotate(next.tile)));
    image[j + 1] = [next.tile];
    j++;
  }

  image = image.reduce((complete, row) => {
    return [...complete, 
      ...row.reduce((combine, tile) => {
        tile = tile.slice(1, -1).map((line) => line.slice(1, -1));
        return combine.map( (line, i) => line + tile[i] );
      }, new Array(row[0].length - 2).fill(''))
    ]}, []);
  
  const count = [
    image,
    rotate(image),
    rotate(rotate(image)),
    rotate(rotate(rotate(image))),
    flip(image),
    rotate(flip(image)),
    rotate(rotate(flip(image))),
    rotate(rotate(rotate(flip(image)))),
  ].map((image) => {
    const line1 = /^..................#./;
    const line2 = /^#....##....##....###/;
    const line3 = /^.#..#..#..#..#..#.../;
    let count = 0;
    for (let index = 0; index < image.length - 2; index++) {
      for (let i = 0; i < image.length; i++) {
        if (image[index].slice(i).match(line1) && 
            image[index + 1].slice(i).match(line2) && 
            image[index + 2].slice(i).match(line3)) {
          count++;
        }
      }
    }
    return count;
  });

  const sum = image
    .map((line) => line.split('').filter((char) => char === '#').length)
    .reduce((a, b) => a + b);
  return sum - count.find((x) => x !== 0) * 15;
};

console.log("Part one answer:", partOne(corners), "\nPart two answer:", partTwo(data, corners));