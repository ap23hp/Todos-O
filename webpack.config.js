
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,   // purane build ko delete karega
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',   // tumhara original html
      filename: 'index.html',
       scriptLoading: 'defer' 
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], // niche CSS ke liye
      },
    ],
  },
};
