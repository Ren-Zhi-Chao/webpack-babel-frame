const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const domain = require('../package.json');
const entry = domain.main.startsWith('./') ? domain.main : `./${domain.main}`;

module.exports = {
  devtool: 'none',
  entry,
  output: {
    path: path.resolve(__dirname, '../', 'lib'),
    filename: 'driller.main.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: { loader: 'babel-loader' } // options 在 .babelrc 定义
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
