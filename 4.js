//@ts-ignore
const fs = require("fs");

const dayfour = () => {
  const getMax = (fromArray) => fromArray.reduce((p, v) => (p > v ? p : v));
  const getMin = (fromArray) => fromArray.reduce((p, v) => (p > v ? v : p));

  // the drawn number required for this row/column to win
  const getBingoIndex = (row, bingoNumbers) =>
    getMax(row.map((n) => bingoNumbers.indexOf(n)));
  // the first row/column to win (with the lowest bingoIndex)
  const checkWinning = (bingoRow, bingoNumbers) =>
    getMin(bingoRow.map((row) => getBingoIndex(row, bingoNumbers)));

  class BingoBoard {
    constructor(board, bingoNumbers) {
      this.board = board;
      this.rows = board.map((row) => row.split(" ").filter((el) => el.length));
      this.columns = this.rows.map((_, idx, arr) => arr.map((x) => x[idx]));
      this.winningIndex = Math.min(
        checkWinning(this.rows, bingoNumbers),
        checkWinning(this.columns, bingoNumbers)
      );
    }
  }

  const calculateScore = (board, winningNumber, bingoNumbers) => {
    const drawnNumbers = bingoNumbers.slice(0, winningNumber + 1);
    const notDrawn = [];
    board.rows.map((row) => {
      row.map((num) => {
        if (!drawnNumbers.includes(num)) notDrawn.push(num);
      });
    });
    const sum = notDrawn.reduce((p, v) => parseInt(v, 10) + p, 0);
    return sum * drawnNumbers[drawnNumbers.length - 1];
  };

  const parseInput = (data) => {
    let [bingoNumbers, ...boards] = data;

    bingoNumbers = bingoNumbers.split(",");
    boards = boards.map(
      (board) => new BingoBoard(board.split("\r\n"), bingoNumbers)
    );

    const winner = getMin(boards.map((b) => b.winningIndex));
    const loser = getMax(boards.map((b) => b.winningIndex));
    const winnerBoard = boards.find((b) => b.winningIndex === winner);
    const loserBoard = boards.find((b) => b.winningIndex === loser);
    const winnerScore = calculateScore(winnerBoard, winner, bingoNumbers);
    const loserScore = calculateScore(loserBoard, loser, bingoNumbers);

    console.log(`
    scores:
      winner: ${winnerScore}
      loser: ${loserScore}
    `);
  };

  try {
    const data = fs.readFileSync("inputs/4.txt", "utf8").split("\r\n\r\n");
    parseInput(data);
  } catch (err) {
    console.error(err);
  }
};

dayfour();
