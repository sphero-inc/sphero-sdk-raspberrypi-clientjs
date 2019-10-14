module.exports = {
  entry: "./src/v1.0/sphero-rvr-toy.ts",
  output: {
    path: __dirname + "/dist",
    filename: "index.js",
    libraryTarget: 'var',
    library: 'SpheroRvr'
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },
  module: {
    rules: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      { test: /\.tsx?$/, use: ["ts-loader"], exclude: /node_modules/ }
    ]
  },
  mode: 'development'
}