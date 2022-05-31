const pkg = require('./package.json');
const path = require('path');
const { StatsWriterPlugin } = require("webpack-stats-plugin");
// const { override, useBabelRc, overrideDevServer } = require("customize-cra");
// const StatsPlugin = require('stats-webpack-plugin');

// const fn = (middlewares, devServer) => {
//   devServer.app.options('*', (req, res) => {
//     // Only serve if request has expected origin header
//     if (req.headers.methods === 'options') {
//       res.sendStatus(200)
//     }
//   })
//   return middlewares
// }

// const devServerConfig = () => (config) => {
//   return {
//     ...config,
//     setupMiddlewares: fn
// }
// }

module.exports = {
  webpack: function (config, env) {
  config.entry = path.resolve(__dirname, 'src/index.js');
  // config.entry = './src/index.js';
  config.output.library = pkg.name;
  config.output.libraryTarget = 'window';
  config.output.publicPath = "http://localhost:3000/";
  config.output.filename = "achieve-subset.js";
  // config.output.chunkFilename = "achieve-subset.chunk.js";
  config.plugins.push(
    new StatsWriterPlugin({
      fields: ["entrypoints", "publicPath"],
      filename: "manifest.json", // Default
    })
  );
  // delete config.optimization;
  return config;
  },
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.headers = config.headers || {};
      config.headers["Access-Control-Allow-Origin"] = "*";
      config.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, DELETE, PUT";
      config.headers["Access-Control-Allow-Credentials"] =true;
      return config;
    };
  },
//   devServer : (configFunction) => (proxy, allowedHost) => {
//     const config = configFunction(proxy, allowedHost);
//       // config.inline = true;
//       // config.disableHostCheck = true;
//       config.headers = config.headers || {};
//       // config.headers["Access-Control-Allow-Origin"] = "http://localhost:8080";
//       //问题：怎么处理options请求
//       config.headers["Access-Control-Allow-Origin"] = "*";
//       config.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, DELETE, PUT";
//       config.headers["Access-Control-Allow-Credentials"] =true;
      
//       // config.sendStatus(200);

//     return {
//        config,
//   }
// }
};
