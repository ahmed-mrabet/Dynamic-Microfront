
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");

const share = mf.share;
const shareAll = mf.shareAll
module.exports = {
  output: {
    uniqueName: "main-app",
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
      
      remotes: {
        
      },
      library: { type: "module" },
      filename: "remoteEntry.js",
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

