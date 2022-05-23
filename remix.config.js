/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverBuildTarget: "netlify",
  server: "./server.js",
  ignoredRouteFiles: [".*"],
  serverDependenciesToBundle: ["marked-react"]
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "netlify/functions/server/index.js",
  // publicPath: "/build/",
  // devServerPort: 8002
};
