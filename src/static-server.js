const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const zlib = require('zlib');
const mime = require('./mime');
const config = require('../config/default');

var options = require( "yargs" )
    .option( "p", { alias: "port",  describe: "设置服务启动的端口号", type: "number" } )
    .option( "i", { alias: "index", describe: "设置默认打开的主页", type: "string" } )
    .option( "c", { alias: "charset", describe: "设置文件的默认字符集", type: "string" } )
    .help()
    .alias( "?", "help" )
    .argv;

const hasTrailingSlash = url => url[url.length - 1] === '/';

class StaticServer {
    constructor() {
        this.port = options.p || config.port;
        this.indexPage = options.i || config.indexPage;
        this.openIndexPage = config.openIndexPage;
        this.charset = options.c || config.charset;
    }

    respondError(err, res) {
        res.writeHead(500);
        return res.end(err);        
    }

    respondNotFound(req, res) {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end(`<h1>Not Found</h1><p>The requested URL ${req.url} was not found on this server.</p>`);
    }

    shouldCompress(pathName) {
        return path.extname(pathName).match(this.zipMatch);
    }

    respond(pathName, req, res) {
        fs.stat(pathName, (err, stat) => {
            if (err) return respondError(err, res);
            this.responseFile(stat, pathName, req, res);
        });

    }

    compressHandler(readStream, req, res) {
        const acceptEncoding = req.headers['accept-encoding'];
        if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
            return readStream;
        } else if (acceptEncoding.match(/\bgzip\b/)) {
            res.setHeader('Content-Encoding', 'gzip');
            return readStream.pipe(zlib.createGzip());
        } else if (acceptEncoding.match(/\bdeflate\b/)) {
            res.setHeader('Content-Encoding', 'deflate');
            return readStream.pipe(zlib.createDeflate());
        }
    }

    responseFile(stat, pathName, req, res) {
        let readStream;
        res.setHeader('Content-Type', `${mime.lookup(pathName)}; charset=${this.charset}`);
        res.setHeader('Accept-Ranges', 'bytes');
        readStream = fs.createReadStream(pathName);
        // 判断是否需要解压
        if (this.shouldCompress(pathName)) {
            readStream = this.compressHandler(readStream, req, res);
        }
        readStream.pipe(res);
    }

    respondRedirect(req, res) {
        const location = req.url + '/';
        res.writeHead(301, {
            'Location': location,
            'Content-Type': 'text/html'
        });
        res.end(`Redirecting to <a href='${location}'>${location}</a>`);
    }

    respondDirectory(pathName, req, res) {
        const indexPagePath = path.join(pathName, this.indexPage);
        // 如果文件夹下存在index.html，则默认打开
        if (fs.existsSync(indexPagePath) && this.openIndexPage) {
            this.respond(indexPagePath, req, res);
        } else {
            fs.readdir(pathName, (err, files) => {
                if (err) {
                    respondError(err, res);
                }
                const requestPath = url.parse(req.url).pathname;
                let content = `<h1>Index of ${requestPath}</h1>`;
                files.forEach(fileName => {
                    let itemLink = path.join(requestPath, fileName);
                    const stat = fs.statSync(path.join(pathName, fileName));
                    if (stat && stat.isDirectory()) {
                        itemLink = path.join(itemLink, '/');
                    }                 
                    content += `<p><a href='${itemLink}'>${fileName}</a></p>`;
                });
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end(content);
            });
        }
    }

    routeHandler(pathName, req, res) {
        fs.stat(pathName, (err, stat) => {
            if (!err) {
                const requestedPath = url.parse(req.url).pathname;
                // 检查url
                // 如果末尾有'.'，且是文件夹，则读取文件夹
                // 如果是文件夹，但末尾没'/'，则重定向至'xxx/'
                // 如果是文件，则判断是否是压缩文件，是则解压，不是则读取文件
                if (hasTrailingSlash(requestedPath) && stat.isDirectory()) {
                    this.respondDirectory(pathName, req, res);
                } else if (stat.isDirectory()) {
                    this.respondRedirect(req, res);
                } else {
                    this.respond(pathName, req, res);
                }
            } else {
                this.respondNotFound(req, res);
            }
        });
    }

    start() {
        http.createServer((req, res) => {
            const pathName = path.join(process.cwd(), path.normalize(req.url));
            this.routeHandler(pathName, req, res);
        }).listen(this.port, err => {
            if (err) {
                console.error(err);
                console.info('Failed to start server');
            } else {
                console.info(`Server started on port ${this.port}`);
            }
        });
    }
}

module.exports = StaticServer;