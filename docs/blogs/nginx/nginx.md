# Nginx 简介与使用

## 什么是 Nginx

Nginx（Engine X）是一款高性能的 HTTP 和反向代理服务器，同时也是一个 IMAP/POP3/SMTP 邮件代理服务器。它以高并发、高稳定性、低资源消耗著称，广泛应用于网站服务器、负载均衡、反向代理等场景。

## Nginx 的主要特点

- 占用内存少，支持高并发连接
- 配置简单灵活
- 支持热部署
- 支持反向代理与负载均衡
- 支持静态资源服务

## Nginx 的基本使用

### 1. 安装 Nginx

**在 Ubuntu 上安装：**
```bash
sudo apt update
sudo apt install nginx
```

**在 CentOS 上安装：**
```bash
sudo yum install epel-release
sudo yum install nginx
```

### 2. 启动与停止 Nginx

```bash
sudo systemctl start nginx    # 启动
sudo systemctl stop nginx     # 停止
sudo systemctl restart nginx  # 重启
sudo systemctl status nginx   # 查看状态
```

### 3. 配置文件结构

Nginx 的主配置文件通常位于 `/etc/nginx/nginx.conf`。常见配置结构如下：

```nginx
http {
    server {
        listen 80;
        server_name example.com;

        location / {
            root /var/www/html;
            index index.html index.htm;
        }
    }
}
```

### 4. 常见应用场景

- **静态资源服务器**：高效服务图片、CSS、JS 等静态文件
- **反向代理**：将请求转发到后端应用服务器
- **负载均衡**：分发请求到多台后端服务器，提高可用性和扩展性

### 5. 访问测试

安装并启动 Nginx 后，在浏览器访问 `http://localhost`，应能看到默认欢迎页面。

---

更多详细配置和高级用法可参考 [Nginx 官方文档](https://nginx.org/en/docs/)。