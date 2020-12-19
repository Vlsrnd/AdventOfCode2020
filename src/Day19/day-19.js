"use script";
//input here data from day-19-data.txt
const inputDataStr = ``;

const data = inputDataStr
  .split('\n\n')[1]
  .split('\n');
const rules = inputDataStr
  .split("\n\n")[0]
  .split('\n')
  .reduce((arr, rule) => {
    arr[rule.split(': ')[0]] = rule
      .split(': ')[1]
      .split(' | ')
      .map(prop => prop.split(' ').map(prop => prop.match(/\D/) ? prop[1] : +(prop)))
    return arr;
  }, []);

const createRegexp = (rules, ruleIndex, isPartTwo) => {
  let rule = rules[ruleIndex];
  if (isPartTwo) {
    if (ruleIndex === 8) return '(' + createRegexp(rules, 42, true) + ')+';
    if (ruleIndex === 11) return '(' + createRegexp(rules, 42, true) + '){n}(' + createRegexp(rules, 31, true) + '){n}';
  }
  let reg = rule.reduce((reg, prop) => {
    reg += '|';
    prop.forEach(operation => {
      if (typeof (operation) === 'number') reg += createRegexp(rules, operation, isPartTwo);
      else reg += operation;
    })
    return reg;
  }, '').slice(1);
  if (reg.includes('|')) reg = '(' + reg + ')';
  if (ruleIndex === 0) reg = '^' + reg + '$';
  return reg;
};

const partOne = data.reduce((count, message) => {
  if (message.match(RegExp(createRegexp(rules, 0, false)))) count++;
  return count;
}, 0);

const partTwo = data.reduce((count, message) => {
  for (let i = 1; i < 5; i++) {
    if (message.match(RegExp(createRegexp(rules, 0, true).replace(/n/g, i)))) count++
  }
  return count;
}, 0);

console.log("Part one answer:", partOne, "\nPart two answer:", partTwo);