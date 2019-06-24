const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require("webpack-merge")
const common = require('./webpack.common')

const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");


let prodConfig = {
  mode: 'production',
  output: {
    filename: 'main.[hash].js', // 打包后的文件名
    path: path.resolve(__dirname, './dist') // resolve将相对路径转换为绝对路径
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }, {
      test: /\.(sc|c|sa)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            sourceMap: true,
            plugins: loader => [
              require('autoprefixer')({
                browsers: ['> 0.15% in CN']
              }) // 添加前缀
            ]
          }
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }
      ]
    }]
  },
  plugins: [ // 将样式文件打包后生成一个文件
    new MiniCssExtractPlugin({
      filename: '[name].css', // 设置最终输出的文件名
      chunkFilename: '[id].css'
    })
  ],
  optimization: {
    minimizer: [ // 压缩css
      new OptimizeCSSAssetsPlugin(),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
    ]
  }
};

module.exports = merge(common, prodConfig)