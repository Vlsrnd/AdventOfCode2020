"use script";

const inputDataStr = `.......#
....#...
...###.#
#...###.
....##..
##.#..#.
###.#.#.
....#...`;

const getNeighbors = (cube, is4d) => {
  const coord = cube.split(',').map(value => +value);
  const neighbors = [];
  const xs = [coord[0], coord[0] - 1, coord[0] + 1];
  const ys = [coord[1], coord[1] - 1, coord[1] + 1];
  const zs = [coord[2], coord[2] - 1, coord[2] + 1];
  let ws;
  if (is4d) ws = [coord[3], coord[3] - 1, coord[3] + 1];
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      for (let z = 0; z < 3; z++) {
        if (is4d) {
          for (let w = 0; w < 3; w++) {
            if (coord[0] !== xs[x] ||
                coord[1] !== ys[y] ||
                coord[2] !== zs[z] ||
                coord[3] !== ws[w]) {
                neighbors.push(`${xs[x]},${ys[y]},${zs[z]},${ws[w]}`)
            }
          }
        } else {
          if (coord[0] !== xs[x] ||
              coord[1] !== ys[y] ||
              coord[2] !== zs[z]) {
            neighbors.push(`${xs[x]},${ys[y]},${zs[z]}`)
          }
        }
      }
    }
  }
  return neighbors;
};

const main = (input, getNeighborsFunc, is4d) => {
  let initialState = new Set();

  const lines = input.split("\n").map(line => line.split(''));

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === '#') initialState.add(`${x},${y},0` + (is4d ? ',0' : ''));
    }
  }

  for (i = 0; i < 6; i++) {
    const activeCube = new Map();

    initialState.forEach(cube => {
      getNeighborsFunc(cube, is4d).forEach(neighbor => {
        if (!activeCube.has(neighbor)) activeCube.set(neighbor, 0);
        activeCube.set(neighbor, activeCube.get(neighbor) + 1);
      });
    });

    resultState = new Set([...activeCube.keys()]
      .filter(cube => activeCube.get(cube) === 3 || (activeCube.get(cube) === 2 && initialState.has(cube)) ));
    initialState = resultState;
  }
  return resultState.size;
}


console.log("Part one answer:", main(inputDataStr, getNeighbors, false),
            "\nPart two answer:", main(inputDataStr, getNeighbors, true));

