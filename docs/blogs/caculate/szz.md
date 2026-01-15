## 移动0

```
function moveZero(nums) {
    if(nums.length <= 1) return nums
    for(let left=0, right=0;right<nums.length;right++) {
        if(nums[right] == 0) {
            continue
        } 
        if(left !== right) {
            let temp = nums[right]
            nums[right] = nums[left]
            nums[left] = temp
        }
       
        left++
    }
    return nums
}
```

## 盛最多水的容器
```
function maxWaterContain(nums) {
    if(!nums) return
    if(nums.length == 1) return 0
    let left = 0
    let right = nums.length - 1
    let maxContain = 0
    while(left < right) {
        const height = Math.min(nums[left], nums[right])
        const width = right - left
        const currentContain = height * width
        maxContain = Math.max(maxContain,currentContain)
        if(nums[left] > nums[right]) {
            right--
        } else {
            left++
        }
    }
    return maxContain

} 


```
## 三数之和
```
var threeSum = function (nums) {
    const target = []
    nums.sort((a, b) => a - b)
    for (let i = 0; i < nums.length - 2; i++) {
        // 该数大于0，无需计算
        if (nums[i] > 0) break
        // 该数跟以前的相等不行
        if (nums[i - 1] === nums[i]) {
            continue
        }
        let left = i + 1
        let right = nums.length - 1
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right]
            if (sum === 0) {
                target.push([nums[i], nums[left], nums[right]])

                while (left < right && nums[left + 1] === nums[left]) {
                    left++
                }
                while (left < right && nums[right] === nums[right - 1]) {
                    right--
                }
                // 此时指针还在重复数字位置上，需要减掉
                left++
                right--
            } else if (sum > 0) {
                right--
            } else if (sum < 0) {
                left++
            }
        }
    }
    return target
};

```