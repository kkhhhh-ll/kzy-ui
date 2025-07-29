// import { parse } from "path";
// console.log(parse("C:\\Users\\kyk\\Desktop\\gb\\kzy-ui\\src\\index.js"));

// map，两数之和
function getArr(arr, target) {
    const map = new Map()
    arr.forEach((item, index) => {
        if (map.has(target - item)) {
            console.log([index, map.get(target - item)])
        } else {
            map.set(item, index)
        }
    }
    )
}
getArr([2, 7, 10, 11], 9)

// 字母异构
function getStr(strArr) {
    const map = new Map()
    strArr.forEach(item => {
        const sortStr = Array.from(item).sort().toString()
        if (!map.has(sortStr)) {
            map.set(sortStr, [])
        }
        map.get(sortStr).push(item)

    })
    console.log(map)
}
getStr(['tea', 'eat', 'aet', 'tan'])

// 最长连续序列
function getMax(arr) {
    const set = new Set(arr)
    let maxLength = 1
    for (let i = 0; i < arr.length; i++) {
        // 序列的起点
        let num = arr[i]
        let currentLength = 0
        if (!set.has(num - 1)) {
            while (set.has(num++)) {
                currentLength++
            }
            maxLength = Math.max(maxLength, currentLength)
        }
    }
    console.log(maxLength)
}
getMax([1, 2, 3, 4, 5, 100, 101, 102, 103, 104, 105, 106, 200])

// 移动0，指针->左右指针的时候，需要人为的改变left，right的值
function moveZero(arr) {
    let left = 0
    for (let right = 0; right < arr.length; right++) {
        if (arr[right] !== 0) {
            if (left !== right) {
                let temp = arr[left]
                arr[left] = arr[right]
                arr[right] = temp
            }
            left++
        }
    }
    console.log(arr)
}
moveZero([1, 2, 0, 0, 1, 5, 10])


// 盛水问题
function getMaxArea(arr) {
    let left = 0;
    let right = arr.length - 1
    let maxArea = 0
    while (left < right) {
        const width = right - left
        const minHeight = Math.min(arr[left], arr[right])
        const currentArea = width * minHeight
        maxArea = Math.max(maxArea, currentArea)
        if (arr[left] < arr[right]) {
            left++
        } else {
            right--
        }
    }
    console.log(maxArea)
}
getMaxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])

// 三数之和
function getThreeAdd(arr) {
    // 排序后的数组
    const sortArr = arr.sort()
    let res = []
    for (let i = 0; i < sortArr.length; i++) {
        if (sortArr[i] > 0) break
        // 跳过重复的第一个数
        if (i > 0 && sortArr[i] == sortArr[i - 1]) continue;
        let left = i + 1
        let right = sortArr.length - 1
        while (left < right) {
            let sum = sortArr[i] + sortArr[left] + sortArr[right]
            if (sum === 0) {
                res.push([sortArr[i], sortArr[left], sortArr[right]])
                while (left < right && sortArr[left] === sortArr[left + 1]) left++
                while (left < right && sortArr[right] === sortArr[right - 1]) right--
                left++
                right--
            } else if (sum < 0) {
                left++
            } else {
                right--
            }
        }
    }
    console.log(res)
}
getThreeAdd([-1, 0, 1, 2, -1, -4])

// 接雨水
function getRainArea(arr) {
    let left = 0, right = arr.length - 1;
    let leftMax = 0, rightMax = 0;
    let max = 0
    while (left < right) {
        leftMax = Math.max(leftMax, arr[left])
        rightMax = Math.max(rightMax, arr[right])
        if (leftMax < rightMax) {
            max += leftMax - arr[left]
            left++
        } else {
            max += rightMax - arr[right]
            right--
        }
    }
    console.log(max)
}
getRainArea([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])

// 滑动窗口
// 连续的
function windowSlice(str) {
    const map = new Map()
    let maxLength = 0;
    for (let i = 0, left = 0; i < str.length; i++) {
        if (map.has(str[i])) {
            left = Math.max(left, map.get(str[i]) + 1)
        }
        map.set(str[i], i)
        maxLength = Math.max(maxLength, i - left + 1)
    }
    console.log(maxLength)
}
windowSlice('abcdabe')

// 和为k的子数组
function getChildArrAdd(arr, add) {
    const map = new Map()
    map.set(0, 1)
    let count = 0;
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i] // 1 3 4 6
        count += (map.get(sum - add) ?? 0) // 0 1 2 3
        map.set(sum, (map.get(sum) ?? 0) + 1) // 1:1 3:1 4:1 6:1
    }
    console.log(count)
}
getChildArrAdd([1, 2, 1, 2], 3)

// 窗口内的最大值
// 保证窗口里的数值为size
// 大的数值放在最前边
function windowMax(arr, size) {
    const maxArr = new Array(arr.length - size + 1)
    // 存的index
    const que = []
    for (let i = 0; i < arr.length; i++) {
        // 出队
        if (que.length > 0 && que[0] < i - size + 1) {
            que.shift()
        }
        while (que.length > 0 && arr[que[que.length - 1]] < arr[i]) {
            que.pop()
        }
        que.push(i)
        if (i >= size - 1) {
            maxArr[i - size + 1] = arr[que[0]]
        }
    }
    console.log(maxArr)
}
windowMax([3, 1, 4, 2], 2)