//@ts-ignore
const fs = require("fs");
const testInput = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

dayEleven = () => {
  class Octopus {
    constructor(x, y, energy) {
      this.x = parseInt(x, 10);
      this.y = parseInt(y, 10);
      this.flashes = 0;
      this.flashed = false;
      this.energy = parseInt(energy, 10);
    }
  }

  const createOctopus = (row, yCoord) =>
    row.split("").map((energy, xCoord) => new Octopus(xCoord, yCoord, energy));

  const anyFlashers = (octopusMap) => {
    let anyFlasher = false;
    octopusMap.map((octopus) => {
      if (octopus.energy > 9 && !octopus.flashed) {
        anyFlasher = true;
      }
    });
    return anyFlasher;
  };

  const everyoneFlashed = (octopusMap) => {
    let didThey = true;
    octopusMap.map((octopus) => {
      if (!octopus.flashed) {
        didThey = false;
      }
    });

    return didThey;
  };

  const mapTick = (octopusMap) => {
    octopusMap.map((octopus) => (octopus.energy += 1));
    // check for flashes until no more flashes
    while (anyFlashers(octopusMap)) {
      flashEm(octopusMap);
    }
    if (everyoneFlashed(octopusMap)) {
      throw "We're done here";
    }
    resetFlashed(octopusMap);
    return octopusMap;
  };

  const resetFlashed = (octopusMap) =>
    octopusMap.map((octopus) => {
      octopus.flashed = false;
      return octopus;
    });

  const checkIfNeighbors = (o1, o2) => {
    const xDiff = Math.abs(o1.x - o2.x);
    const yDiff = Math.abs(o1.y - o2.y);
    if (xDiff === 0 && yDiff === 0) return false;
    if (xDiff <= 1 && yDiff <= 1) return true;
    return false;
  };

  const incrementAround = (octopus, octopusMap) => {
    octopusMap.map((maybeNeighbor) => {
      if (checkIfNeighbors(maybeNeighbor, octopus)) {
        // don't increment flashers
        if (!maybeNeighbor.flashed) maybeNeighbor.energy += 1;
      }
    });
  };

  const flashEm = (octopusMap) => {
    octopusMap.map((octopus) => {
      if (octopus.energy > 9 && !octopus.flashed) {
        octopus.energy = 0;
        octopus.flashed = true;
        octopus.flashes += 1;
        incrementAround(octopus, octopusMap);
      }
    });
  };

  try {
    const data = fs.readFileSync("inputs/11.txt", "utf8").split("\r\n");

    const octopusMap = data
      .map((row, yCoord) => createOctopus(row, yCoord))
      .flat();

    /* pt1:
    for (let i = 0; i < 100; i++) {
        mapTick(octopusMap)
      }

      const totalFlashes = octopusMap.reduce((p, octopus) => p + octopus.flashes, 0)
      console.log('total flashes: ', totalFlashes)
    */

    // pt2, figure out when all have flashed
    let ticks = 0;
    try {
      while (true) {
        ticks += 1;
        mapTick(octopusMap);
      }
    } catch (e) {
      console.log("ticks until everyone flashed: ", ticks);
    }
  } catch (err) {
    console.error(err);
  }
};

dayEleven();
