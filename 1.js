//@ts-ignore
const fs = require("fs");
const testInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

const simpleIncreases = (data) => {
  const increases = data.reduce((acc, curr, i, arr) => {
    if (!arr[i + 1]) return acc;
    if (curr < arr[i + 1]) return acc + 1;
    return acc;
  }, 0);
  console.log(increases);
};

const sum = (array) => array.reduce((prev, curr) => prev + curr);

const slidingWindowIncreases = (data, windowSize) => {
  const increases = data.reduce((acc, curr, i, arr) => {
    if (arr.slice(i + 1, i + 1 + windowSize).length < 3) return acc;

    const slice1 = arr.slice(i, i + windowSize);
    const slice2 = arr.slice(i + 1, i + 1 + windowSize);

    if (sum(slice1) < sum(slice2)) return acc + 1;
    return acc;
  }, 0);
  console.log(increases);
};

try {
  const data = fs
    .readFileSync("inputs/1.txt", "utf8")
    .split("\r\n")
    .map((i) => parseInt(i, 10));
  // simpleIncreases(data);
  slidingWindowIncreases(data, 3);
} catch (err) {
  console.error(err);
}
