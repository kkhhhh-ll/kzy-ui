## 最大连续子数组和

给你一个整数数组 nums，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

```
// 状态转移方程 dp[i] = max(dp[i-1]+nums[i],nums[i])
// 长度为1，返回第一项
function maxArrayAdd(nums) {
    if (nums.length === 1) return nums.at(0)
    let currentMax = 0
    let maxSum = -Infinity
    nums.forEach((item) => {
        currentMax = Math.max(currentMax + item, item)
        maxSum = Math.max(currentMax, maxSum)
    })
    return maxSum
}
```

## 区间合并

给出一个区间的集合，请合并所有重叠的区间。

```
function numberMerge(nums) {
    if(nums.length <= 1) return nums
    nums.sort((a,b)=>a[0]-b[0])
    let result = []
    let current = nums[0]
    for(let i = 1;i<nums.length;i++) {
        if(current[1]>=nums[i][0]) {
            current[1] = Math.max(current[1],nums[i][1])
        } else {
            result.push(current)
            current = nums[i]
        }
    }
    result.push(current)
    return result
}

```

## 轮转数组

给你一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。

```
function rotate(nums,k) {
    if(nums.length <= 1) return nums
    k=k%nums.length
    if(k === 0) return
    const reverse = (nums,start,end)=> {
        while(start<end) {
            let middle = nums[start]
            nums[start] = nums[end] 
            nums[end] = middle
            start++
            end--
        }
    }
    reverse(nums,0,nums.length-1)
    reverse(nums,0,k-1)
    recerse(nums,k,nums.length-1)
}


```
