## 两数之和

给定一个整数数组nums和一个整数目标值target，请你在该数组中找出和为目标值target的那两个整数，并返回它们的数组下标。

```
//
function getTarget(nums,target) {
    const map = new Map()
    for(let i =0;i<nums.length;i++) {
        if(map.has(target - nums[i])) {
            return [i,map.get(target - nums[i])]
        } else {
            map.set(nums[i],i)
        }
    }
    return []
}

```

## 字母异位词分组

给你一个字符串数组，请你将所有的字母异位词放在同一个组里。字母异位词是由相同的字母重新排列组成的单词。

```
function getStr(arr) {
    const map = new Map()
    for(let i = 0;i<arr.length;i++) {
        const sortedStr = arr[i].split('').sort().join('')
        <!-- const sortedStr = Array.from(arr[i]).sort().toString() -->
        if(!map.has(sortedStr)) {
            map.set(sortedStr,[])
        }
        map.get(sortedStr).push(arr[i])
    }
    return Array.from(map.values())
}

```

## 最长连续序列

给定一个未排序的整数数组nums，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

```
var longestConsecutive = function (nums) {
    if (nums.length === 0) return 0
    let maxLength = 0
    const set = new Set(nums)
    for (const num of set) {
        if (set.has(num - 1)) {
            continue
        }
        let nextNum = num + 1
        let currentLength = 1
        while (set.has(nextNum)) {
            nextNum++
            currentLength++
        }
        maxLength = Math.max(maxLength, currentLength)
        if (maxLength * 2 >= set.size) {
            break;
        }
    }
    return maxLength

};
```
