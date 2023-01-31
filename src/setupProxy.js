//setupProxy.js

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/v1"], {
      target: "http://localhost:3000/api/",
      pathRewrite: {
        "/api": "",
      },
      router: {
        "/api": "http://localhost:3000/api/",
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
