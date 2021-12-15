//@ts-ignore
const fs = require("fs");

const testInput = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

const dayFourteen = () => {
  const buildPolymerTemplate = (polymerTemplate) => {
    const template = {};
    polymerTemplate.map((pairing) => {
      const [pair, result] = pairing.split(" -> ");
      template[pair] = result;
    });

    return template;
  };

  const polymerize = (pair, template) =>
    `${pair[0]}${template[pair]}${pair[1]}`;

  const mergeOutput = (input) => {
    return input.map((pair, i, arr) => {
      if (arr[i + 1] && pair[2] === arr[i + 1][0]) {
        return pair.slice(0, 2);
      }
      return pair;
    });
  };

  const createPairs = (input) =>
    input
      .split("")
      .map((el, i, arr) => {
        if (arr[i + 1]) {
          return `${el}${arr[i + 1]}`;
        }
      })
      .filter((el) => !!el);

  try {
    const [input, space, ...polymerTemplate] = fs
      .readFileSync("inputs/14.txt", "utf8")
      .split("\r\n");

    // const [input, space, ...polymerTemplate] = testInput.split("\n")

    console.log("input: ", input);

    const template = buildPolymerTemplate(polymerTemplate);
    console.log(template);

    // do ten times
    let loop10times = input;
    for (let i = 0; i < 10; i++) {
      loop10times = mergeOutput(
        createPairs(loop10times).map((pair) => polymerize(pair, template))
      ).join("");
    }

    const count = {}

    loop10times.split("").map((letter) => {
      if (!count.hasOwnProperty(letter)) {
        count[letter] = 0
      } else {
        count[letter] += 1
      }
    })

    console.log(count)
    const max = Object.values(count).reduce((p, v) => p > v ? p : v)
    const min = Object.values(count).reduce((p, v) => p > v ? v : p)

    console.log('max: ', max, 'min: ', min)
    console.log('diff: ', max-min)
  } catch (err) {
    console.error(err);
  }
};

dayFourteen();
