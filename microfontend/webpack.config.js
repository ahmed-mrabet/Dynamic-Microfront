const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
const mf = require("@angular-architects/module-federation/webpack");
const shareAll = mf.shareAll
module.exports = {
  output: {
    publicPath: "auto",
    scriptType: "text/javascript",
  },
  optimization: {
    runtimeChunk: false,
  },
  experiments: {
    outputModule: true,
  },
  devServer: {
    historyApiFallback: true,
    allowedHosts: 'all',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mysql_connector",
      filename: "remoteEntry.js",
      exposes: {
         './ExposedModule': './src/app/exposed/exposed.module.ts',
      },
      shared:{
        ...shareAll({
          singleton: true,
          strictVersion: false,
          requiredVersion: "auto",

        }),
      },

    }),
  ],
};
