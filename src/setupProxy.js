//setupProxy.js

const { createProxyMiddleware } = require("http-proxy-middleware");
//https://freestrokes.tistory.com/164
module.exports = function (app) {
  app.use(
    createProxyMiddleware(['/api'], {
      target: "http://localhost:3000/",
      pathRewrite: {
        "/api": "",
      },
      router: {
        "/api": "http://localhost:3000/",
      },
      changeOrigin: false,
    })
  );

  //   app.use(
  //     createProxyMiddleware('/다른context', {
  //       target: 'https://다른호스트',
  //       pathRewrite: {
  //         '^/지우려는패스':''
  //       },
  //       changeOrigin: true
  //     })
  //   )
};
