const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/",
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ['css-loader'],
      },
    ]
  }
}