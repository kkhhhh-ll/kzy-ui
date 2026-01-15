## 快排
```
fucntion quickSort(arr) {
    arr ||= []
    if(arr.length <= 1) {
        return arr
    }
    const [pivot,...rest] = arr
    const {left,right}=rest.reduce((acc,cur)=> {
        if(cur<pivot) {
            acc.left.push(cur)
        } else {
            acc.right.push(cur)
        }
        return acc
    },{
        left: [],
        right: []
    })
    return [...quickSort(left),pivot,...quickSort(right)]
}
```

## 冒泡

```
function bubbleSort(arr) {
    arr ||= []
    if (arr.length <= 1) return
    function swap(arr, i, j) {
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 1; j < arr.length - i; j++) {
            if (arr[j - 1] > arr[j]) {
                swap(arr, j - 1, j)
            }
        }
    }
    return arr
}
```