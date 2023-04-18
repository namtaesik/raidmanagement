//setupProxy.js

const { createProxyMiddleware } = require("http-proxy-middleware");
//https://freestrokes.tistory.com/164
module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/api"], {
      target: "http://loacatcountryserver.cafe24app.com",
      // target: "http://127.0.0.1:3001",
      pathRewrite: {
        "/api": "",
      },
      router: {
        "/api": "http://loacatcountryserver.cafe24app.com",
        // "/api": "http://127.0.0.1:3001",
      },
      changeOrigin: true,
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
