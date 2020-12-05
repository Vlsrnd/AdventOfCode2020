'use script';
//input here data from day-05-data.txt
const str = ``;

const setting = {
  minRowNumber: 0,
  maxRowNumber: 127,
  rowCharLow: 'F',
  rowCharHigh: 'B',
  minColumnNumber: 0,
  maxColumnNumber: 7,
  columnCharLow: 'L',
  columnCharHigh: 'R',
};

const decode = (code, minNumber, maxNumber, charLow, charHigh) => {
  let min = minNumber;
  let max = maxNumber;
  let result;
  for (let char of code) {
    if (max - min > 1) {
      if (char === charLow) max -= Math.ceil( (max - min) / 2 );
      if (char === charHigh) min += Math.ceil( (max - min) / 2 );
    } else {
      result = char === charLow ? min : max;
    }
  }
  return result;
}

const decodeComposition = (code, {minRowNumber, maxRowNumber, rowCharLow, 
                                  rowCharHigh, minColumnNumber, maxColumnNumber,
                                  columnCharLow, columnCharHigh}) => {
  const rowCode = code.slice(0,7);
  const columnCode = code.slice(7);

  const row = decode(rowCode, minRowNumber, maxRowNumber, rowCharLow, rowCharHigh);
  const column = decode(columnCode, minColumnNumber, maxColumnNumber, 
                        columnCharLow, columnCharHigh);

  const placeId = (row * 8) + column;
  return placeId;
}

const findEmptyPlace = (arr) => {
  const epmtyPlaceArr = arr.filter( (element, index, arr) => {
    if (index === 0 || index === arr.length - 1) return false;
    if (arr[index + 1] - element > 1) return true;
  })
  return epmtyPlaceArr[0] + 1;
}

const codedArr = str.split('\n');
const decodedArr = codedArr.map(code => decodeComposition(code, setting))
                           .sort( (a, b) => a - b );

console.log('Part one answer:', decodedArr[decodedArr.length - 1],
            '\nPart two answer:', findEmptyPlace(decodedArr));

