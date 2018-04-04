## 使用node搭建静态资源服务器

[![NPM version](https://img.shields.io/npm/v/yumu-static-server.svg?style=flat)](https://npmjs.org/package/yumu)
[![npm](https://img.shields.io/npm/dt/yumu-static-server.svg)](https://npmjs.org/package/yumu)
[![GitHub stars](https://img.shields.io/github/stars/dushao103500/static-server.svg?style=social&label=Star)](https://github.com/dushao103500/static-server)
[![GitHub forks](https://img.shields.io/github/forks/dushao103500/static-server.svg?style=social&label=Fork)](https://github.com/dushao103500/static-server)

### 安装

```bash
npm install yumu-static-server -g
```

### 使用

```bash
server  # 会在当前目录下启动一个静态资源服务器，默认端口为8080

server -p[port] 3000  # 会在当前目录下启动一个静态资源服务器，端口为3000

server -i[index] index.html  # 设置文件夹在默认加载的文件

server -c[charset] UTF-8  # 设置文件默认加载的字符编码

server -cors  # 开启文件跨域
```

### 默认配置（会被命令行参数覆盖）

`./config/default.json`

```javascript
{
  "port": 8080, // 服务启动的端口号
  "indexPage": "index.html", // 文件夹下默认加载文件
  "openIndexPage": true, // 是否默认加载文件
  "charset": "UTF-8", // 默认字符编码
  "zipMatch": "^\\.(css|js|html)$" // 默认
}
```

### 基本功能

1. 启动静态资源服务器
2. 端口可配置
3. 字符编码可配置
4. 文件夹下默认加载文件可配置
5. 是否跨域可配置

### TODO

- [x] 引入handlerbars编译模板
- [x] 支持文件是否跨域
- [ ] 支持https服务
