const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'game.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.relative(__dirname, 'public/index.html'),
      title: 'js13kzombies',
    }),
  ],
};
