const fs = require("fs");

const dayeight = () => {
  const getOutput = (data) => data.split("| ")[1];
  const getInput = (data) => data.split(" |")[0];

  const findNumber = (input, mapping) => {
    const sortedInput = input.split("").sort().join("");
    let number;
    Object.keys(mapping).map((key) => {
      if (mapping.hasOwnProperty(key)) {
        const sortedKey = key.split("").sort().join("");
        if (sortedInput === sortedKey) {
          number = mapping[key];
        }
      }
    });
    return number;
  };

  const buildMapping = (input) => {
    const mapping = {};
    const reverseMap = [];
    // fill known digits, 1, 4, 7, 8
    const inputArr = input.split(" ");
    inputArr.map((knownNumber) => {
      if (knownNumber.length === 2) {
        mapping[knownNumber] = 1;
        reverseMap[1] = knownNumber;
      }
      if (knownNumber.length === 4) {
        mapping[knownNumber] = 4;
        reverseMap[4] = knownNumber;
      }
      if (knownNumber.length === 3) {
        mapping[knownNumber] = 7;
        reverseMap[7] = knownNumber;
      }
      if (knownNumber.length === 7) {
        mapping[knownNumber] = 8;
        reverseMap[8] = knownNumber;
      }
    });

    inputArr.map((maybeNine) => {
      if (maybeNine.length === 6) {
        if (
          reverseMap[4].split("").every((letter) => maybeNine.includes(letter))
        ) {
          mapping[maybeNine] = 9;
          reverseMap[9] = maybeNine;
        }
      }
    });

    inputArr.map((sixOrZero) => {
      if (sixOrZero.length === 6) {
        if (
          reverseMap[1]
            .split("")
            .every(
              (letter) =>
                sixOrZero.includes(letter) && sixOrZero !== reverseMap[9]
            )
        ) {
          mapping[sixOrZero] = 0;
          reverseMap[0] = sixOrZero;
        } else {
          if (sixOrZero !== reverseMap[9]) {
            mapping[sixOrZero] = 6;
            reverseMap[6] = sixOrZero;
          }
        }
      }
    });

    inputArr.map((threeFiveOrTwo) => {
      // segments in 4 minus segments in 1
      const fourMinusOne = reverseMap[4]
        .replace(reverseMap[1][0], "")
        .replace(reverseMap[1][1], "");
      if (threeFiveOrTwo.length === 5) {
        if (
          reverseMap[1]
            .split("")
            .every((letter) => threeFiveOrTwo.includes(letter))
        ) {
          mapping[threeFiveOrTwo] = 3;
          reverseMap[3] = threeFiveOrTwo;
        } else if (
          fourMinusOne
            .split("")
            .every((letter) => threeFiveOrTwo.includes(letter))
        ) {
          mapping[threeFiveOrTwo] = 5;
          reverseMap[5] = threeFiveOrTwo;
        } else {
          mapping[threeFiveOrTwo] = 2;
          reverseMap[2] = threeFiveOrTwo;
        }
      }
    });

    return mapping;
  };

  const countUniqueDigits = (outputString) => {
    let unique = 0;
    const knownWordLengths = [2, 3, 4, 7];
    outputString.split(" ").map((word) => {
      if (knownWordLengths.includes(word.length)) {
        unique += 1;
      }
    });
    return unique;
  };

  try {
    const data = fs.readFileSync("inputs/8.txt", "utf8").split("\r\n");

    const answerPt2 = data
      .map((line) => {
        const output = getOutput(line);
        const input = getInput(line);
        const mapping = buildMapping(input);
        const number = output
          .split(" ")
          .map((codedNumber) => findNumber(codedNumber, mapping))
          .join("");
        return number;
      })
      .map((i) => parseInt(i, 10))
      .reduce((p, v) => p + v);

    const answer = data
      .map(getOutput)
      .map(countUniqueDigits)
      .reduce((p, v) => p + v);
    console.log("pt1: ", answer);

    console.log("pt2: ", answerPt2);
  } catch (err) {
    console.error(err);
  }
};

dayeight();
