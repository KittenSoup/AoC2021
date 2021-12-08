//@ts-ignore
const fs = require("fs");

/* const testInput = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
]; */

const daythree = () => {
  /*   const invert = (str) => {
          return str.map(val => val ? 0 : 1)
      } */

  /* const getGammaAndEpsilon = (inputData) => {
        const width = inputData[0].length
        const gamma = []
        for (let i = 0; i < width; i++) {
            const val = checkInput(inputData, i, "1")
            gamma.push(val)
        }
        // console.log('gamma: ', gamma)
        const epsilon = invert(gamma)
        // console.log('epsilon: ', epsilon)
        const decimalgamma = parseInt(gamma.join(""), 2)
        const decimalepsilon = parseInt(epsilon.join(""), 2)
     
        return decimalgamma * decimalepsilon
    }

    const findOne = (filtered, mostCommon, lookFor) => {
        let result = ""
        mostCommon.forEach((num, idx) => {
            if (filtered.length < 3) {
                if (filtered.length === 1) {
                    result = filtered[0]
                    return
                }
                console.log('found some stuff: ', filtered, ' in pos ', idx)
                // result = filtered
                console.log("look for a ", lookFor, " in index: ", idx)
                result = filtered[0][idx] === lookFor ? filtered[0] : filtered[1]
                return

            }
            filtered = filtered.filter((el) => {
                return parseInt(el[idx], 10) === num ? el : undefined
            })
            // console.log(' filtered: ', filtered.length)
        })
        return result
    }

    const getOxygenAndCo2 = (inputData) => {
        console.log('reducing stuff down to one value..')
        const width = inputData[0].length
        const oxy = []
        const co2 = []
        for (let i = 0; i < width; i++) {
            const oxyvalues = checkInput(inputData, i, "1")
            oxy.push(oxyvalues)
            const co2values = checkInput(inputData, i, "0")
            co2.push(co2values)
        }
        let filtered = inputData
        let resultOxygen = findOne(filtered, oxy, 1)
        let resultCo2 = findOne(filtered, co2, 0)
        console.log('result: ', parseInt(resultOxygen, 2), parseInt(resultCo2, 2))
        console.log('multiplied: ', parseInt(resultOxygen, 2) * parseInt(resultCo2, 2))
    } */

  const countBits = (input, index) => {
    const ones = input.reduce((prev, curr) => {
      if (curr[index] === "1") {
        return prev + 1;
      }
      return prev;
    }, 0);
    return ones >= input.length / 2 ? 1 : 0;
  };

  const filterUntilOneRemains = ({ report, whatIndex, shouldInvert }) => {
    const mostCommonBit = countBits(report, whatIndex);
    let bitFilter = mostCommonBit;
    if (shouldInvert) {
      bitFilter = mostCommonBit === 1 ? 0 : 1;
    }
    if (report.length === 1) return report;
    const newReport = report.filter(
      (entry) => entry[whatIndex] === "" + bitFilter
    );
    const newIndex = whatIndex + 1;
    return filterUntilOneRemains({
      report: newReport,
      whatIndex: newIndex,
      shouldInvert,
    });
  };

  const getOxygenAndStuff = (report) => {
    const oxy = parseInt(
      filterUntilOneRemains({ report, whatIndex: 0, shouldInvert: false }),
      2
    );
    console.log("oxy: ", oxy);
    const co2 = parseInt(
      filterUntilOneRemains({ report, whatIndex: 0, shouldInvert: true }),
      2
    );
    console.log("co2: ", co2);
    return `life rating = ${oxy * co2}`;
  };

  try {
    const data = fs.readFileSync("inputs/3.txt", "utf8").split("\r\n");
    // console.log('answer: ', getGammaAndEpsilon(data))
    console.log("answer pt2: ", getOxygenAndStuff(data));
  } catch (err) {
    console.error(err);
  }
};

daythree();
