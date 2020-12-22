'use strict';

const player1Str = '41,33,20,32,7,45,2,12,14,29,49,37,6,11,39,46,47,38,23,22,28,10,36,35,24';
const player2Str = '17,4,44,9,27,18,30,42,21,26,16,48,8,15,34,50,19,43,25,1,13,31,3,5,40';

const partOne = (deck1, deck2) => {
  let player1 = deck1.split(',').map(n => +n).reverse();
  let player2 = deck2.split(',').map(n => +n).reverse();
  while (player1.length > 0 && player2.length > 0) {
    const one = player1.pop();
    const two = player2.pop();
    if (one > two) player1 = [two, one, ...player1];
    else player2 = [one, two, ...player2];
  }
  return (player1.length > player2.length ? [...player1] : [...player2])
    .map((num, i) => num * (i + 1))
    .reduce((sum, num) => sum += num);
}

const partTwo = (deck01, deck02, isMainGame) => {
  let player1 = deck01.split(',').map(n => +n).reverse();
  let player2 = deck02.split(',').map(n => +n).reverse()
  const archive = new Set();
  let isP1win;

  while (player1.length > 0 && player2.length > 0) {
    if (archive.has(player1.join('') + ':' + player2.join(''))) return true;
    archive.add(player1.join('') + ':' + player2.join(''))
    const one = player1.pop();
    const two = player2.pop();
    if (player1.length >= one && player2.length >= two) {
      isP1win = partTwo(
        player1.slice(player1.length - one).reverse().join(','),
        player2.slice(player2.length - two).reverse().join(','));
    }
    else isP1win = one > two;

    if (isP1win) player1 = [two, one, ...player1]
    else player2 = [one, two, ...player2]
  }
  if (isMainGame) {
    return (isP1win ? [...player1] : [...player2])
    .map((num, i) => num * (i + 1))
    .reduce((sum, num) => sum += num);
  } else {
    return player1.length > 0 ? true : false;
  }
}

console.log('Part one answer:', partOne(player1Str, player2Str), 
  '\nPart two answer:', partTwo(player1Str, player2Str, true));