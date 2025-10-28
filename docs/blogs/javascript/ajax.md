## ajax

使用promise封装ajax

```
function getJSON(url) {
    return new Promise((resolve, reject)=> {
        const xhr = new XMLHttpRequest
        xhr.open("GET",url,true)
        xhr.onreadystatechange=function() {
            if(this.readyState !== 4) return
            if(this.status === 200) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        }
        xhr.onerror=function() {
            reject(new Error(this.statusText))
        }
        xhr.responseType = 'json'
        xhr.setRequestHeader('Accept','application/json')
        xhr.send(null)
    })
}

```
