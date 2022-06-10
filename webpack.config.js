const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

module.exports = (env) => {

  return {
    mode: env.NODE_ENV === DEVELOPMENT ? DEVELOPMENT : PRODUCTION,

    entry: {
      index: './src/index.js',
    },
    output: {
      filename: './bundle-[name]-[chunkhash].js',
      path: path.resolve(__dirname, './dist'),
      assetModuleFilename: 'Images/build-[name]-[hash][ext]',
    },

    resolve: {
      extensions: ['.js'],
    },

    // watch: env.NODE_ENV === DEVELOPMENT,
    devtool: env.NODE_ENV === PRODUCTION ? false : 'source-map',

    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      hot: 'only',
    },

    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', [
              "@babel/preset-react", {
                "pragma": "window.jsx.createElement",
                "pragmaFrag": "window.jsx.Fragment"
              }]
            ],
            ...(env.NODE_ENV === DEVELOPMENT ? {
              targets: {
                chrome: '80',
                opera: '70',
                edge: '90',
                firefox: '80',
              },
            } : {}),
          },
        },
      }, {
        test: /\.(scss)|(css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }, {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 8192,
          },
        },
      }],
    },

    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'bundle-[name]-[chunkhash].css',
        chunkFilename: 'bundle-[id]-[chunkhash].css',
      }),
      new HtmlWebpackPlugin({
        filename: './index.html',
      }),
    ],
  };
};
