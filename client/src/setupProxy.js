const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/current_user", {
      target: "http://localhost:5000",
    })
  );
  app.use(
    createProxyMiddleware("/auth/google", { target: "http://localhost:5000" })
  );
  app.use(
    createProxyMiddleware("/api/logout", { target: "http://localhost:5000" })
  );
};
