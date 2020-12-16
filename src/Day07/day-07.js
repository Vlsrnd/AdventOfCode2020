"use script";
//input here data from day-07-data.txt
const rulesStr = ``;

const rulesArr = rulesStr
  .replace(/\sbags|\sbag|\./g, "")
  .split("\n")
  .map((rule) => rule.split(" contain "))
  .map((rule) => ({
    color: rule[0],
    innerBags:
      rule[1].split(", ")[0] === "no other"
        ? [] : rule[1]
               .split(", ")
               .map((bag) => ({
                 count: parseInt(bag),
                 color: bag.replace(/^\d /g, ""),
               })),
  }));

const partOne = (color, rules) => {
  let resultCollection = new Set();

  const expandBagTree = (color) => {
    if (resultCollection.has(color)) return;
    resultCollection.add(color);
    const bags = rules.filter((bag) => {
      return (
        bag.innerBags.filter((innerBag) => innerBag.color === color).length > 0
      );
    });

    for (const bag of bags) {
      expandBagTree(bag.color);
    }
  };

  expandBagTree(color);

  return resultCollection.size - 1;
};

const partTwo = (color, rules) => {
  let result = 0;
  const getCont = (color) => {
    const bags = rules.filter((x) => x.color === color);

    for (const bag of bags) {
      for (const elem of bag.innerBags) {
        for (let i = 0; i < elem.count; i++) {
          result++;
          getCont(elem.color);
        }
      }
    }
  };
  getCont(color);
  return result;
};

console.log("Part one answer:", partOne("shiny gold", rulesArr),
            "\nPart two answer:", partTwo("shiny gold", rulesArr));