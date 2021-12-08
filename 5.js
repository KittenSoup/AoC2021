const fs = require("fs");

const testInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`

const dayfive = () => {
  let diagram = {}

  const getCoordinatePair = (line) => {
    const [start, end] = line.split(" -> ")
    const [startX, startY] = start.split(",")
    const [endX, endY] = end.split(",")

    return {
      start: {
        x: parseInt(startX, 10),
        y: parseInt(startY, 10),
      },
      end: {
        x: parseInt(endX, 10),
        y: parseInt(endY, 10),
      }
    }
  }

  const plotCoordinatePair = ({start, end}) => {
    let stepX = start.x < end.x ? 1 : -1
    let stepY = start.y < end.y ? 1 : -1
    stepX = start.x === end.x ? 0 : stepX
    stepY = start.y === end.y ? 0 : stepY 

    const lineLength = Math.max(Math.abs(start.x - end.x), Math.abs(start.y - end.y))
    for (let i = 0; i < lineLength+1; i++) {
      const xCoord = start.x + i*stepX
      const yCoord = start.y + i*stepY
      const coord = `${xCoord}x${yCoord}`
      if (diagram.hasOwnProperty(coord)) {
        diagram[coord] = diagram[coord] + 1
      } else {
        diagram[coord] = 1
      }
    }
  }

  const countOverlaps = () => {
    let overlaps = 0
    for (var key in diagram) {
      if (diagram.hasOwnProperty(key)) {
        if (diagram[key] > 1) {
          overlaps++
        }
      }
    }
    return overlaps
  }

  try {
    const data = fs.readFileSync("inputs/5.txt", "utf8").split("\r\n");

    // testInput.split("\n").map(getCoordinatePair).map(plotCoordinatePair)
    data.map(getCoordinatePair).map(plotCoordinatePair)
    const overlaps = countOverlaps()
    console.log(`found ${overlaps} overlapping lines`)
  } catch (err) {
    console.error(err);
  }
};

dayfive();