"use script";
//input here data from day-14-data.txt
const inputDataStr = ``;

//preparing input data. [{mask: [], addresses: [[index, num]...[index, num]]}]
let inputDataArr = inputDataStr.split("mask = ");
inputDataArr.shift();
inputDataArr = inputDataArr.map((elem) => {
  elem = elem.split("\n");
  elem.pop();
  return {
    mask: elem[0].split(""),
    addresses: elem.slice(1).map((address) => {
      address = address.replace(/mem\[/g, "");
      return address.split(/\]\s=\s/g);
    }),
  };
});
inputDataArr.forEach((item) => {
  item.addresses = item.addresses.map((address) => {
    let binar = (+address[1]).toString(2);
    binar = binar.length < 36 ? "0".repeat(36 - binar.length) + binar : binar;
    return [address[0], binar.split("")];
  });
});

const partOne = (inputData) => {
  let mask = "";
  const memory = {};

  inputData.forEach((step) => {
    mask = step.mask;
    step.addresses.forEach((address) => {
      const index = +address[0];
      const num = address[1];
      let value = "";
      for (let i = 0; i < mask.length; i++) {
        const char = mask[mask.length - 1 - i];
        if (char === "1") value = "1" + value;
        else if (char === "0") value = "0" + value;
        else value = num[num.length - 1 - i] + value;
      }
      memory[index] = parseInt(value, 2);
    });
  });

  return Object.values(memory).reduce((sum, num) => (sum += +num), 0);
};

const partTwo = (inputData) => {
  const memory = [];
  let sum = 0;
  let mask = "";

  const multiplication = (address, value) => {
    const index = address.indexOf("X");
    if (!~index) {
      const adr = parseInt(address, 2);
      sum = memory[adr] ? sum + value - memory[adr] : sum + value;
      memory[adr] = value;
    } else {
      multiplication(
        address.substring(0, index) + "0" + address.substring(index + 1),
        value
      );
      multiplication(
        address.substring(0, index) + "1" + address.substring(index + 1),
        value
      );
    }
  };

  inputData.forEach((step) => {
    mask = step.mask;
    step.addresses.forEach((address) => {
      const index = (+address[0]).toString(2);
      const num = parseInt(address[1].join(""), 2);
      let value = "";
      for (let i = 0; i < mask.length; i++) {
        const char = mask[mask.length - i - 1];
        if (char === "1") value = "1" + value;
        else if (char === "0")
          value = (index.charAt(index.length - i - 1) || "0") + value;
        else value = "X" + value;
      }
      multiplication(value, num);
    });
  });
  
  return sum;
};

console.log("Part one answer:", partOne(inputDataArr),
            "\nPart two answer:", partTwo(inputDataArr));
