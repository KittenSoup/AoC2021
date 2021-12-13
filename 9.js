const fs = require('fs')

const daynine = () => {

  class Point {
    constructor ({x, y, value}) {
      this.x = x
      this.y = y
      this.value = value
      this.coord = `${x}x${y}`
    }
  }

  const testData = `2199943210
3987894921
9856789892
8767896789
9899965678`

  const getNeighbors = (point, caveMap) => {
    return [
      caveMap[`${point.x - 1}x${point.y}`], // to the left
      caveMap[`${point.x}x${point.y - 1}`], // above
      caveMap[`${point.x + 1}x${point.y}`], // to the right
      caveMap[`${point.x}x${point.y + 1}`], // below
    ]
  }

  const checkIfLowest = (point, caveMap) => {
    isLowest = true

    if (point.value > 9 || point.value < 0) {
      console.log('found invalid value')
    }

    const neighbors = getNeighbors(point, caveMap)

    neighbors.map((adjacent) => {
      if (adjacent && adjacent.value <= point.value) {
        isLowest = false
      }
    })
    return isLowest
  }

  // should be done in a nicer way I suppose
  let filled = []
  let checked = []

  const fillBasin = (startPoint, caveMap) => {
    const neighbors = getNeighbors(startPoint, caveMap).filter((point) => point && point.value < 9)
    
    checked.push(startPoint)
    neighbors.map((p) => {
      if (!checked.includes(p)) {
        filled.push(p)
        checked.push(p)
        // also check if p has any neighbors
        fillBasin(p, caveMap)
      }
    })

    return filled
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

    const lowPoints = []

    const riskMap = Object.keys(caveMap).map((key) => {
      if (caveMap.hasOwnProperty(key)) {
        if (checkIfLowest(caveMap[key], caveMap)) {
          lowPoints.push(caveMap[key])
          return caveMap[key].value + 1
        }
        return 0
      }
    })

    console.log('lowPoints: ', lowPoints)

    const basins = lowPoints.map((lowPoint) => {
      filled = [lowPoint]
      checked = [lowPoint]
      return fillBasin(lowPoint, caveMap)
    })
    const sizes = basins.map((basin) => {
      return basin.length
    })

    sizes.sort((a,b) => b-a)

    console.log('three biggest: ', sizes.slice(0,3).reduce((p,v) => p*v))

    console.log(`total risk is: ${riskMap.reduce((p, v) => p+v)}`)

  } catch (err) {
    console.log(err)
  }
}

daynine()