const fs = require('fs')

const daynine = () => {

  class Point {
    constructor ({x, y, value}) {
      this.x = x
      this.y = y
      this.value = value
    }
  }

  const testData = `2199943210
3987894921
9856789892
8767896789
9899965678`

  const checkIfLowest = (point, caveMap) => {
    isLowest = true

    if (point.value > 9 || point.value < 0) {
      console.log('found invalid value')
    }

    const neighbors = [
      caveMap[`${point.x - 1}x${point.y}`], // to the left
      caveMap[`${point.x}x${point.y - 1}`], // above
      caveMap[`${point.x + 1}x${point.y}`], // to the right
      caveMap[`${point.x}x${point.y + 1}`], // below
    ]

    neighbors.map((adjacent) => {
      if (adjacent && adjacent.value <= point.value) {
        isLowest = false
      }
    })
    return isLowest
  }

  try {
    const data = fs.readFileSync('./inputs/9.txt', 'utf-8').split('\r\n')

    const test = testData.split('\n');

    const caveMap = []

    data.map((row, y) => {
      row.split("").map(i => parseInt(i, 10)).map((j, x) => {
        caveMap[`${x}x${y}`] = new Point({
            x,
            y,
            value: j
          })
      })
    })

    const riskMap = Object.keys(caveMap).map((key) => {
      if (caveMap.hasOwnProperty(key)) {
        if (checkIfLowest(caveMap[key], caveMap)) {
          return caveMap[key].value + 1
        }
        return 0
      }
    })

    // console.log(riskMap)

    console.log(`total risk is: ${riskMap.reduce((p, v) => p+v)}`)

  } catch (err) {
    console.log(err)
  }
}

daynine()