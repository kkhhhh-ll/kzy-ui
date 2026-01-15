## 股票买卖的时机

```
function cashBuy(arr) {
    if (!arr || arr.length <= 1) return 0
    let maxGet = 0
    let minPrice = arr[0]
    for (let i = 1; i < arr.length; i++) {
        const currentGet = arr[i] - minPrice
        maxGet = Math.max(currentGet, maxGet)
        if (arr[i] < minPrice) {
            minPrice = arr[i]
        }
    }
    return maxGet
}
```

## 跳跃
// 就看他最后能不能跳出
```
fucntion jumpOut(arr) {
    let maxReach = 0
    for(let i = 0; i<= maxReach && i<arr.length;i++) {
        maxReach = Math.max(maxReach,i+arr[i])
        if(maxReach >= nums.length - 1) {
            return true
        }
    }
    return false
}

```

## 最小跳跃次数

```
function minStep(arr) {
    if(arr.length <= 1) return 0
    let step = 0
    let currentMax = 0
    let nextMax = 0
    for(let i = 0;i<arr.length-1;i++) {
        nextMax = Math.max(nextMax,i+arr[i])
        if(i === currentMax) {
            step++
            currentMax = nextMax
            if(currentMax >= arr.length - 1){
                break
            }
        }

    }
    return step
}


```