const fs = require("fs");

const testInput = `16,1,2,0,4,2,7,1,2,14`;

const dayseven = () => {
  const calculateMoveCost = (position, crab) => {
    const distance = Math.abs(position - crab);
    return Array.from(Array(distance + 1).keys()).reduce((p, v) => p + v, 0);
  };

  const crabsPt2 = (crabs) => {
    const maximumCrab = crabs.reduce((p, v) => (p > v ? p : v));
    const crabPositions = [];

    for (let i = 0; i < maximumCrab; i++) {
      const moveCosts = [];
      crabs.map((crab) => {
        const moveCost = calculateMoveCost(i, crab);
        // console.log("it cost ", moveCost, " to move ", crab, " to ", i);
        moveCosts.push(moveCost);
      });
      crabPositions.push(moveCosts);
    }

    const totalScores = crabPositions.map(moveCosts => moveCosts.reduce((p, v) => p+v))

    const lowestCost = totalScores.reduce((p, v) => p < v ? p : v)
    console.log('lowest score is ', lowestCost, " in position ", totalScores.indexOf(lowestCost))

    
  };

  try {
    const data = fs.readFileSync("inputs/7.txt", "utf8").split(",");

    // const crabs = testInput
    //  .split(",")
    //  .map((i) => parseInt(i, 10))
    //  .sort((a, b) => a - b);
    const crabs = data.sort((a,b) => a - b)
    const targetPt1 = crabs[crabs.length / 2];

    const fuelRequiredPt1 = crabs.reduce((acc, crab) => {
      return acc + Math.abs(targetPt1 - crab);
    }, 0);

    console.log("fuel required pt 1: ", fuelRequiredPt1);

    crabsPt2(crabs);
  } catch (err) {
    console.error(err);
  }
};

dayseven();
