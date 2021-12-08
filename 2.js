//@ts-ignore
const fs = require("fs");

const daytwo = () => {

    const position = {
        horizontal: 0,
        depth: 0,
        aim: 0,
    }

    const parseInstructions = (instruction) => {
        const [command, value] = instruction.split(" ");

        switch (command) {
            case "forward":
                position.horizontal += parseInt(value, 10)
                position.depth += parseInt(value, 10) * position.aim
                break
            case "down":
                position.aim += parseInt(value, 10)
                break
            case "up":
                position.aim -= parseInt(value, 10)
                break
            default:
                break
        }
        return instruction
    }

    try {
        fs.readFileSync("inputs/2.txt", "utf8")
            .split("\r\n")
            .map(parseInstructions);
    } catch (err) {
        console.error(err);
    }

    console.dir(position)

    console.log(position.horizontal * position.depth)
}

daytwo()



