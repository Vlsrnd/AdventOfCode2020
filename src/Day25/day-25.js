'use strict';

const cardPublicKey = `9232416`;
const doorPublicKey = `14144084`;
const DIVIDER = 20201227;

let transform = (subjectNumber, loopSize) => {
  let value = 1;
  for (let i = 0; i < loopSize; i++) {
    value = (value * subjectNumber) % DIVIDER;
  }
  return value;
};

let calcLoopSize = (subjectNumber, publicKey) => {
  let value = 1;
  let loopSize = 0;
  while (value != publicKey) {
    value = (value * subjectNumber) % DIVIDER;
    loopSize++;
  }
  return loopSize;
};

const doorEncryptionKey = transform(doorPublicKey, calcLoopSize(7, cardPublicKey));
const cardEncryptionKey = transform(cardPublicKey, calcLoopSize(7, doorPublicKey));

const partOne = doorEncryptionKey;

console.log(1478097 === partOne);

