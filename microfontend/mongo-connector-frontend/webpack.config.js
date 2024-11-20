const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
const mf = require("@angular-architects/module-federation/webpack");
const shareAll = mf.shareAll;
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
      name: "mongo_connector",
      filename: "remoteEntry.js",
      exposes: {
        './ExposeModule': './src/app/expose/expose.module.ts', // Ensure this path is correct
      },
      shared: {
        ...shareAll({
          singleton: true,
          strictVersion: false,
          requiredVersion: "auto",
        }),
      },
    }),
  ],
};
