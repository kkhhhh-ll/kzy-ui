# websocket和sse

## websocket
websocket是全双工通信，可实现服务端和客户端实时通信，协议类型为ws://或wss://，需要通过http握手后建立tcp连接，数据格式支持二进制数据和文本数据，需要自己手动实现连接管理逻辑。适用于实时聊天、在线文档、游戏对战等场景。


## sse
sse是半双工通信，只支持服务端向客户端推送消息，基于http协议，数据格式只支持utf-8文本格式，浏览器采用消息订阅模式，处理连接通信过程中的连接问题。适用于通知系统、AI流式响应。

# Fetch + ReadableStream 与 sse
sse只能支持get请求，无法配置请求头，数据格式只能是utf-8文本格式。
fetch支持post请求，数据传递格式更灵活。通过fetch获取响应的body属性，是readablestream，可以通过getReader+TextDecoder获取流数据。