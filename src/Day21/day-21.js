"use script";
//input here data from day-21-data.txt
const inputDataStr = ``;

const allergens = {};
const ingredients = {};
const data = inputDataStr
  .split('\n')
  .map(food => {
    const ingrs = food.split(' (contains ')[0].split(' ');
    const allergs = food.split(' (contains ')[1].replace(/[,\)]/g, '').split(' ');
    ingrs.forEach(ingr => ingredients[ingr] = '');
    allergs.forEach(allerg =>
      allergens[allerg] = allergens[allerg] ? [...allergens[allerg], ingrs] : [ingrs])
    return [ingrs, allergs]
  })

const uniqueIngredients = [];
const uniqueAllergens = [];

let isComplete = false
while (!isComplete) {
  isComplete = true;
  for (let [allergen, lists] of Object.entries(allergens)) {
    if (typeof lists !== 'string') {
      let filteredIngr = lists.some(elem => Array.isArray(elem)) ?
        lists.reduce((prev, next) => prev.filter(ingr => next.includes(ingr))) :
        lists.filter(ingr => ingredients[ingr] === '')
      if (filteredIngr.length > 1) {
        allergens[allergen] = filteredIngr;
        isComplete = false;
      } else {
        uniqueAllergens.push(allergen);
        uniqueIngredients.push(filteredIngr[0]);
        allergens[allergen] = filteredIngr[0];
        ingredients[filteredIngr[0]] = allergen;
      }
    }
  }
}

const partOne = data.reduce((sum, food) => {
  return sum += food[0].filter(x => !uniqueIngredients.includes(x)).length
}, 0);

const partTwo = uniqueAllergens.sort().reduce((result, allergen) => {
  return result += allergens[allergen] + ','
}, '').slice(0, -1);


console.log("Part one answer:", partOne, "\nPart two answer:", partTwo);