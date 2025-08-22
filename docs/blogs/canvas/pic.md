Canvas使用的是W3C坐标系，从上往下，从左往右。

# 绘制基础图形

## 画线段

样式需要在stroke方法使用之前设置

```
// html
<canvas id="canvas" width="200" height="200"></canvas>
// script
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
// 开启新路径
ctx.beginPath()
// 定义画线的起始点
ctx.moveTo(50,50)
// 定义画线的折点
ctx.lineTo(150,150)
// 设置线的颜色
ctx.strokeStyle = 'skyblue'
// 设置线的宽度，单位是像素
ctx.lineWidth = 10
// 通过线条来绘制图形轮廓
ctx.stroke()
// 关闭路径
ctx.closePath()
```

## 画三角形

```
// html
<canvas id="canvas" width="200" height="200"></canvas>
// script
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
ctx.beginPath()
ctx.moveTo(50,50)
ctx.lineTo(150,150)
ctx.lineTo(150,50)
ctx.lineTo(50,50)
// 设置像素后闭合处更衔接
ctx.closePath()
ctx.strokeStyle = 'skyblue'
ctx.lineWidth = 10
ctx.stroke()
```

## 画矩形

### 空心矩形

第一种方式

```
// html
<canvas id="canvas" width="200" height="200"></canvas>
// script
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
ctx.beginPath()
ctx.moveTo(50,50)
ctx.lineTo(50,150)
ctx.lineTo(150,150)
ctx.lineTo(150,50)
ctx.lineTo(50,50)
// 设置像素后闭合处更衔接
ctx.closePath()
ctx.strokeStyle = 'skyblue'
ctx.lineWidth = 10
ctx.stroke()
```

第二种方式

```
// html
<canvas id="canvas" width="200" height="200"></canvas>
// script
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
ctx.beginPath()
ctx.strokeRect(50,50,100,100)
// 设置像素后闭合处更衔接
ctx.closePath()
```

第三种方式

```
// html
<canvas id="canvas" width="200" height="200"></canvas>
// script
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
ctx.rect(50,50,100,100)
setTimeout(()=> {
    ctx.stroke()
},2000)
```

### 填充矩形

第一种方式<br>
使用fillStyle和fillRect时，必须在fillRect前使用fillStyle进行颜色填充

```
// html
<canvas id="canvas" width="200" height="200"></canvas>
// script
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
ctx.beginPath()
ctx.fillStyle = 'skyblue'
ctx.fillRect(50,50,100,100)
// 设置像素后闭合处更衔接
ctx.closePath()
```

第二种方式

```
// html
<canvas id="canvas" width="200" height="200"></canvas>
// script
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
ctx.fillStyle = 'skyblue'
ctx.rect(50,50,100,100)
setTimeout(()=> {
    ctx.fill()
},2000)
```

其他绘制就是调用相应的api，可在官方文档进行查阅

