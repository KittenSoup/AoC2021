const fs = require("fs");

const testInput = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

const dayten = () => {
  
  const processInputPt1 = (chars) => {
    const bracketPairs = {
      "[": "]",
      "(": ")",
      "{": "}",
      "<": ">",
    };
    const stack = [];
    const result = {
      isCorrupted: false,
      char: "",
    };

    chars.split("").map((x) => {
      if (Object.keys(bracketPairs).includes(x)) stack.push(bracketPairs[x]);
      else {
        if (stack.pop() !== x) {
          result.isCorrupted = true;
          result.char = x;
        }
      }
    });

    return {
      stack,
      isCorrupted: result.isCorrupted,
      char: result.char,
    };
  };

  const calculateScore = (char) => {
    const scoring = {
      "}": 1197,
      ")": 3,
      "]": 57,
      ">": 25137,
    };

    return scoring[char];
  };

  const calculateAutoCompleteScore = (stack) => {
    const reversed = stack.reverse()
    const scoring = {
      ")": 1,
      "]": 2,
      "}": 3,
      ">": 4,
    }
    let score = 0;
    reversed.map((x) => {
      score = score * 5 + scoring[x]
    })

    return score
  }

  try {
    const data = fs.readFileSync("inputs/10.txt", "utf8").split("\r\n");

    const corruptCharacters = [];
    const incompletes = [];
    // testInput.split("\n").filter((input) => {
    data.filter((input) => {
      const { isCorrupted, char, stack } = processInputPt1(input);
      if (isCorrupted) corruptCharacters.push(char);
      if (!isCorrupted) {
        incompletes.push(stack)
      }
      return isCorrupted;
    });

    const finalScore = corruptCharacters
      .map(calculateScore)
      .reduce((p, v) => p + v);

    console.log("final score: ", finalScore);

    const autoCompleteScores = incompletes.map(calculateAutoCompleteScore).sort((a, b) => a-b)
    console.log('autocomplete score: ', autoCompleteScores[Math.floor(autoCompleteScores.length/2)])
  } catch (err) {
    console.log(err);
  }
};

dayten();
