"use script";

//input here data from day-16-data-rules.txt
const rules = ``;
//input here data from day-16-data-my-ticket.txt
const myTicket = ``.split(',').map(n => +n);
//input here data from day-16-data-tickets.txt
const tickets = ``

const rulesObj = rules.split('\n')
  .reduce((obj, rule) => {
    const arr = rule.split(':');
    obj[arr[0]] = arr[1]
      .split('or')
      .reduce((arr, range) => {
        const [min, max] = range.trim().split('-').map(n => +n);
        for (let i = min; i <= max; i++) {
          arr.push(i + '');
        }
        return arr
      }, [])
    return obj;
  }, {});

const ticketsArr = tickets.split('\n').map(ticket => ticket.split(','));

const range = [...Object.values(rulesObj)].flat();

const partOne = ticketsArr.reduce( (sum, ticket) => {
  ticket.forEach(num => {
    if (!range.includes(num)) sum += +num;
  })
  return sum;
}, 0);

const validTickets = ticketsArr.filter(ticket => {
  let isValid = true;
  for (let num of ticket) {
    if (!range.includes(num)) {
      isValid = false;
      break;
    }
  }
  return isValid;
});

const fields = [];

for (let ticket of validTickets) {
  for (let i = 0; i < ticket.length; i++) {
    const num = ticket[i];
    const validFields = [];
    for (const [name, range] of Object.entries(rulesObj)) {
      if (range.includes(num)) validFields.push(name);
    }
    if (fields[i]) fields[i] = fields[i].filter(x => validFields.indexOf(x) !== -1);
    else fields[i] = validFields;
  }
}

let partTwo = 1

for (let k = 0; k < fields.length; k++) {
  let i
  const validField = fields.find((x, j) => {
    if(x.length === 1) {
      i = j;
      return true;
    }
  })[0];
  if (validField.startsWith('departure')) partTwo *= myTicket[i];
  for (let j = 0; j < fields.length; j++) {
    const index = fields[j].indexOf(validField)
    if (index !== -1) fields[j].splice(index, 1)
  }
}

console.log("Part one answer:", partOne,
            "\nPart two answer:", partTwo);