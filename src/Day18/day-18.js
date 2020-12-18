"use script";
//input here data from day-18-data.txt
const inputDataStr = ``;

const exercises = inputDataStr
  .split('\n')
  .map(exercise => {
    exercise = exercise.replace(/\s/g, '')
    return exercise.split('');
  })

const mathParsePartOne = (exercise) => {
  let result = '';
  for (let i = 0; i < exercise.length; i++) {
    if (exercise[i] === '(') {
      let countOpenParentheses = 1;
      let countCloseParentheses = 0;
      const startIndex = i + 1;
      let stopIndex;
      for (let j = startIndex; j < exercise.length; j++) {
        if (exercise[j] === '(') countOpenParentheses++;
        if (exercise[j] === ')') countCloseParentheses++;
        if (countCloseParentheses === countOpenParentheses) {
          stopIndex = j;
          break;
        }
      }
      const intermediateExpression = exercise.slice(startIndex, stopIndex);
      i = stopIndex;
      result += (mathParsePartOne(intermediateExpression));
      result = eval(result) + '';
    } else {
      if (result.split(/\D/).length === 1) {
        result += exercise[i];
      } else {
        result += exercise[i];
        result = eval(result) + '';
      }
    }
  }
  if (result.split(/\D/).length !== 1) result = eval(result)
  return +result;
};

const mathParsePartTwo = (exercise) => {
  const startIndex = exercise.indexOf('(');
  if (~startIndex) {
    let stopIndex;
    let countOpenParentheses = 1;
    let countCloseParentheses = 0;
    for (let i = startIndex + 1; i < exercise.length; i++) {
      if (exercise[i] === '(') countOpenParentheses++;
      if (exercise[i] === ')') countCloseParentheses++;
      if (countCloseParentheses === countOpenParentheses) {
        stopIndex = i;
        break;
      }
    }
    const firstPart = exercise.slice(0, startIndex);
    const middlePart = exercise.slice(startIndex + 1, stopIndex);
    const lastPart = exercise.slice(stopIndex + 1);
    return mathParsePartTwo([...firstPart, mathParsePartTwo(middlePart), ...lastPart]);
  }
  const nextPlusIndex = exercise.indexOf('+');
  const nextMultiplyIndex = exercise.indexOf('*');
  const nextOperationIndex = ~nextMultiplyIndex ? nextMultiplyIndex : nextPlusIndex;

  if (!~nextOperationIndex) return +exercise;

  const firstPart = exercise.slice(0, nextOperationIndex);
  const lastPart = exercise.slice(nextOperationIndex + 1);

  return exercise[nextOperationIndex] === '*' ?
    mathParsePartTwo(firstPart) * mathParsePartTwo(lastPart) :
    mathParsePartTwo(firstPart) + mathParsePartTwo(lastPart);
};

const partOne = exercises.reduce((sum, exercise) => sum + mathParsePartOne(exercise), 0);
const partTwo = exercises.reduce((sum, exercise) => sum + mathParsePartTwo(exercise), 0);

console.log("Part one answer:", partOne, "\nPart two answer:", partTwo);