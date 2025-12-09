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