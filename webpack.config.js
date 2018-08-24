const path = require('path');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'app', 'index'),
  output: {
    filename: 'bundle.ts',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /.tsx?$/,
      include: [
        path.resolve(__dirname, '/')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'bower_components')
      ],
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  resolve: {
    extensions: ['.json', '.ts', '.tsx', '.css']
  },
  devtool: 'source-map',
  devServer: {
    publicPath: path.join('app/public/')
  }
};