local open = io.open

local function read_file(path)
    local file = open(path, "rb") -- r read mode and b binary mode
    if not file then
        return nil
    end
    local content = file:read "*a" -- *a or *all reads the whole file
    file:close()
    return content
end

local fileContent = read_file("inputs/2.txt");

local pos = {horizontal = 0, depth = 0, aim = 0}

local function parseInstruction(instruction)
    for k, v in string.gmatch(instruction, "(%w+)%s(%w+)") do
        v = tonumber(v)
        if (k == "forward") then
            pos.horizontal = pos.horizontal + v
            pos.depth = pos.depth + pos.aim * v
        elseif (k == "down") then
            pos.aim = pos.aim + v
        elseif (k == "up") then
            pos.aim = pos.aim - v
        end
    end
end

local data = {}
for i in string.gmatch(fileContent, "[^\r\n]+") do
    table.insert(data, i)
end

for key, value in ipairs(data) do
    parseInstruction(value)
end

print("horizontal*depth  = ", pos.horizontal*pos.depth)
