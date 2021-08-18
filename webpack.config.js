const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const isProd = process.env.NODE_ENV === "production";

const optimization = () => {
  const config = {}

  if (isProd) {
    //
    config.minimize = true,
    config.minimizer = [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ]
  }

  return config;
}

const esLintPlugin = isProd =>
  isProd ? [new ESLintPlugin({
      extensions: ['tsx', 'jsx', 'ts', 'js'] ,
      failOnError : true
    })]
    : [new ESLintPlugin({
      extensions: ['tsx', 'jsx', 'ts', 'js'] ,
      threads: true,
      emitError: true,
      emitWarning: true,
      failOnError: false
    })];

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[contenthash].js',
    path: path.resolve(__dirname, "dist"),

  },
  devServer: {
    open: true,
    hot: true,
    historyApiFallback: true,
    host: "localhost",
    contentBase: path.join(__dirname, 'public')
  },
  devtool: isProd ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset/resource',
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      title: "React-forms-task"
    }),
    new CleanWebpackPlugin(),
    // new CopyPlugin({
    //     patterns: [{ from: 'public' }],
    // }),
    ...esLintPlugin(isProd)
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  optimization: optimization()
}