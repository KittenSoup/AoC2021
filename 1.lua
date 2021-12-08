local open = io.open

testData = {199, 200, 208, 210, 200, 207, 240, 269, 260, 263}

local function read_file(path)
    local file = open(path, "rb") -- r read mode and b binary mode
    if not file then
        return nil
    end
    local content = file:read "*a" -- *a or *all reads the whole file
    file:close()
    return content
end

local fileContent = read_file("inputs/1.txt");

data = {}

for i in string.gmatch(fileContent, "[^\r\n]+") do
    table.insert(data, tonumber(i, 10))
end

acc = 0

local function simpleCompare (inputData)
    local acc = 0
    for key, value in ipairs(inputData) do
        if not tonumber(inputData[key+1]) then break end
        if (inputData[key] < inputData[key+1]) then
            acc = acc + 1
        end
    end
    return acc
end

local function sum(input)
    local sum = 0
    for key, value in ipairs(input) do
        sum = sum + value
    end
    return sum
end

local function slidingWindowCompare (inputData)
    local acc = 0
    for key, value in ipairs(inputData) do
        if not tonumber(inputData[key+3]) then break end
        first = { inputData[key], inputData[key+1], inputData[key+2] }
        second = { inputData[key+1], inputData[key+2], inputData[key+3] }
        
        if (sum(first) < sum(second)) then
            acc = acc + 1
        end
    end
    return acc
end

print(simpleCompare(data))
-- print(slidingWindowCompare(testData))