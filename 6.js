const fs = require("fs");

const daysix = () => {
  const testInput = `3,4,3,1,2`;

  const simulateFish = ({ fish, days }) => {
    for (let i = 0; i < days; i++) {
      const spawns = fish[0];
      fish.shift();
      fish[6] = fish[6] + spawns;
      fish[8] = spawns;
    }
    const howMuchIsTheFish = fish.reduce((p, v) => p + v)
    console.log(`living fish: ${howMuchIsTheFish}`);
  };

  const countFish = (fish) => {
    const fishBucket = new Array(9).fill(0);
    fish.map((fish) => {
      fishBucket[parseInt(fish, 10)] = fishBucket[parseInt(fish, 10)] + 1;
    });
    return fishBucket;
  };

  try {
    const data = fs.readFileSync("inputs/6.txt", "utf8").split(",");
    const fishBucket = countFish(data);

    simulateFish({ fish: fishBucket, days: 256 });
  } catch (err) {
    console.error(err);
  }
};

daysix();
