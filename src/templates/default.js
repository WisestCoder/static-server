module.exports = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>node静态服务器</title>
  <style>
    html, body {
      padding: 0;
      margin: 0;
      width: 100%;
      height: 100%;
    }
    .app {
      padding-left: 50px;
      min-height: calc(100% - 50px);
      overflow: hidden;
    }
    .footer {
      text-align: center;
      height: 50px;
    }
  </style>
</head>
<body>
  <div class="app">
      <h1>当前目录：<span>{{requestPath}}</span></h1>
      {{#if showFileList}}
        {{#each fileList}}
          <p><a href='{{link}}'>{{name}}</a></p>
        {{/each}}
      {{else}}
        {{htmlStr}}
      {{/if}}
  </div>
  <div class="footer">
      <span>github地址: <a target="_blank" href="https://github.com/WisestCoder/static-server">https://github.com/WisestCoder/static-server</a></span>
      <br />
      <span>&copy; ISC</span>
  </div>
</body>
</html>
`;