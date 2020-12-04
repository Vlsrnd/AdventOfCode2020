'use script';
//input here data from day-02-data.txt
const str = ``;


const verificationRequirementsPartOne = {
  byr: /./gi,
  iyr: /./gi,
  eyr: /./gi,
  hgt: /./gi,
  hcl: /./gi,
  ecl: /./gi,
  pid: /./gi,
};

const verificationRequirementsPartTwo = {
  byr: /^19[2-9][0-9]|200[0-2]$/,
  iyr: /^201[0-9]|2020$/,
  eyr: /^202[0-9]|2030$/,
  hgt: /^1[5-8][0-9]cm|19[0-3]cm|59in|6[0-9]in|7[0-6]in$/,
  hcl: /^#[0-9a-f]{6}$/,
  ecl: /^amb|blu|brn|gry|grn|hzl|oth$/,
  pid: /^[0-9]{9}$/,
};

//prepare input data. Modify from string to arr
const arr = str.replace('\n', ' ')
               .split('\n\n')
               .map(element => element.split(/\s/)
               .map(param => param.split(':')))
               .map(elem => elem.filter(prop => prop[0] !== 'cid'))
               .filter(element => element.length > 6)
               .map(elem => elem.sort());


function checkDocument(passport, verificationRequirements) {
  let result = true;
  passport.forEach( param => {
    if (param[0] === 'cid') {
      return;
    } else if (!verificationRequirements[param[0]]) {
      result = false;
    } else if (param[1].match(verificationRequirements[param[0]])) {
      return;
    } else {
      result = false;
    } 
  })
  return result;
}

const checkDocuments = (passports, verificationRequirements) => {
  let count = 0;
  passports.forEach(passport => {
    if (checkDocument(passport, verificationRequirements)) count++;
  })
  return count;
}

console.log('Part one answer:', checkDocuments(arr, verificationRequirementsPartOne),
            '\nPart two answer:', checkDocuments(arr, verificationRequirementsPartTwo));

