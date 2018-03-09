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
server  // 会在当前目录下启动一个静态资源服务器，默认端口为8080

server -p 3000  // 会在当前目录下启动一个静态资源服务器，端口为3000
```

### 默认配置（会被命令行参数覆盖）

`./config/default.json`

```javascript
{
  port: 8080, // 服务启动的端口号
  indexPage: 'index.html' // 文件夹下默认加载文件
  ...
}
```

### 基本功能

1. 启动静态资源服务器
2. 端口可配置
3. 文件夹下默认加载文件可配置

### TODO

出自我手的工具，都是无与伦比的丑，应该引入模板语言，加入样式，优化界面；如目前手上的一个老项目中用到的handlerbar或者others