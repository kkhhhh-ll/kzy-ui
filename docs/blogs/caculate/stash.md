## 括号
```
function validFlag(str) {
    if (str.length % 2 != 0) return false
    const stash = []
    const map = new Map()
    map.set(')', '(')
    map.set(']', '[')
    map.set('}', '{')
    for (let i = 0; i < str.length; i++) {
        if (!map.has(str[i])) {
            stash.push(str[i])
        } else {
            // 遇到右括号时，没进栈的数据；或者不匹配
            if (stash[stash.length - 1] !== map.get(str[i]) || stash.length === 0) {
                return false
            }
            stash.pop()
        }
    }
    return stash.length === 0
}
```