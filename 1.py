from functools import reduce

testData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]

with open('inputs/1.txt', encoding="utf-8") as f:
    inputData = list(map(int, f.read().split()))
    
def compareData(x, y):
    if x < y:
        return 1
    return 0

def simpleIncrease(inputData):
    acc = 0
    for index, this in enumerate(inputData):
        try:
           acc += compareData(this, inputData[index+1])
        except IndexError:
            print("done: ", acc)

def slidingWindowIncrease(inputData, windowSize):
    acc = 0
    for index, this in enumerate(inputData):
        # sum of n=0 + windowSize, compare with sum of n+1 + windowSize
        try:
            slice1 = reduce(lambda x, y: x+y, inputData[index:index+windowSize])
            slice2 = reduce(lambda x, y: x+y, inputData[index+1:index+windowSize+1])
            acc += compareData(slice1, slice2)
            
        except (IndexError, TypeError):
            print("done: ", acc)

# simpleIncrease(inputData)
slidingWindowIncrease(inputData, 3)
