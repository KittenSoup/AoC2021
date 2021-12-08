const fs = require("fs");

const dayeight = () => {

  const getOutput = (data) => data.split("| ")[1]

  const countUniqueDigits = (outputString) => {
    let unique = 0
    const knownWordLengths = [2, 3, 4, 7]
    outputString.split(" ").map((word) => {
      if (knownWordLengths.includes(word.length)) {
        unique += 1
      }
    })
    return unique
  }

  try {
    const data = fs.readFileSync("inputs/8.txt", "utf8").split("\r\n");

    const output = data.map(getOutput)

    const answer = output.map(countUniqueDigits).reduce((p, v) => p+v)

    console.log(answer)
  } catch (err) {
    console.error(err);
  }
};

dayeight();
