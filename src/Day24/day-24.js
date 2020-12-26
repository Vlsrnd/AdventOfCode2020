'use script';

// input here data from day-24-data.txt
const inputDataStr = ``;

const directionsChar = ['ne', 'nw', 'sw', 'se', 'e', 'w'];
const directionsNum = {
  w: [1, 0],
  e: [-1, 0],
  sw: [0.5, 1],
  se: [-0.5, 1],
  nw: [0.5, -1],
  ne: [-0.5, -1],
};

const data = inputDataStr
  .split('\n')
  .map(line => {
    directionsChar.forEach(char => {
      line = line.replaceAll(char, directionsNum[char] + '|');
    })
    const result = line.split('|');
    result.pop();
    return result.map(coord => coord.split(',').map(Number));
  });

function walkTheLine(lines) {
  const blackTiles = new Set();

  lines.forEach((line) => {
    const tile = [0, 0];
    line.forEach(coord => {
      tile[0] += coord[0];
      tile[1] += coord[1];
    })
    const tileStr = tile.join(',')
    if (blackTiles.has(tileStr)) blackTiles.delete(tileStr);
    else blackTiles.add(tileStr);
  });

  return blackTiles;
}

const tiles = walkTheLine(data);
const partOne = tiles.size;

const getNeighbor = (tail) => {
  const [x, y] = tail.split(',').map(Number);
  return Object.values(directionsNum).map(([deltaX, deltaY]) => `${x + deltaX},${y + deltaY}`);
};

const countBlackNeighbor = (tiles, blackTilesSet) => tiles.filter(tile => blackTilesSet.has(tile)).length;

function executeDay(blackTiles, days) {
  const newBlackTiles = new Set();

  Array.from(blackTiles).forEach(tile => {
    const whiteNeighbors = getNeighbor(tile).filter(tail => !blackTiles.has(tail));
    whiteNeighbors.forEach(tile => {
      const countNeighbor = countBlackNeighbor(getNeighbor(tile), blackTiles);
      if (countNeighbor === 2) newBlackTiles.add(tile);
    })
    const countNeighbor = countBlackNeighbor(getNeighbor(tile), blackTiles);
    if (countNeighbor === 1 || countNeighbor === 2) newBlackTiles.add(tile);
  })
  return days > 1 ? executeDay(newBlackTiles, days - 1) : newBlackTiles;
}

const partTwo = executeDay(tiles, 100).size;

console.log('Part one answer:', partOne, '\nPart two answer:', partTwo);