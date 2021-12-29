'use strict';

let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devServer = (isDev) => !isDev ? {} : {
  devServer:{
    open: true,
    hot: true,
    port:8080, 
    static: path.join(__dirname, 'public')
  }
};

module.exports = ({develop}) => ({

  mode: develop ?  'development' : 'production',
  devtool: develop? 'inline-source-map':'none',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,  'dist'),
    assetModuleFilename: 'asset/[hash][ext]'
  },
  watch: true,

  devtool: "source-map",
  module: {
    rules:[
      {
        test: /\.[tj]s$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
       
    ]
      
  },

  resolve:{
    extensions:['.ts', '.js']
  },

   plugins: [
     new HtmlWebpackPlugin({
     template: './src/index.html'
   }),
   
   new CopyPlugin({
    patterns: [
      { from: "./src/assets", to: "assets" },
  
    ],
  }),

    
     new MiniCssExtractPlugin({
       filename: 'styles.css'
     }),
     new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
  ],
    ...devServer(develop)
});