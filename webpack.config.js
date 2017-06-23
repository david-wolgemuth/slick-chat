module.exports = {
  context: __dirname,
  entry: "./client/src",
  output: {
    filename: "./client/dist/app.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};