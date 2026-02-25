const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const RemoveCodeBetweenCommentsPlugin = require('./babel-plugin-remove-code-between-comments');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode !== 'production';
  // Check if we are running the readable build command
  const isReadable = env && (env.readable === true || env.readable === 'true');

  // Folders: dist/editor vs dist/editor-readable
  const editorFolder = isReadable ? 'editor-readable' : 'editor';
  const renderFolder = isReadable ? 'render-readable' : 'render';

  // Shared Optimization Logic
  const getOptimization = (isEditor) => ({
    // If it's a readable build, turn off minification entirely
    minimize: isReadable ? false : !isDev,
    splitChunks: {
      chunks: 'all',
      cacheGroups: isEditor ? {
        indexVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'index-vendors',
          chunks: chunk => chunk.name === 'index',
          enforce: true,
        },
      } : {
        vendors: {
          test: /[\\/]node_modules[\\/](?!(three|@react-three|postprocessing|three-stdlib))/,
          name: 'render-vendors',
          chunks: 'all',
          priority: 10,
        },
    
      },
    },
    runtimeChunk: false,
    // THE FIX: sideEffects: false only for the Editor to prevent breaking the Studio logic
    // We omit it or set it to true for Render to keep the bundle size optimized.
    // sideEffects: isEditor ? false : true,
    // sideEffects: false,
  });


  // Editor bundle config
  const indexConfig = {
    mode: isDev ? 'development' : 'production',
    entry: { index: "./src/index.tsx" },
    output: {
      path: path.resolve(__dirname, 'dist', editorFolder),
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
      clean: true,
    },
    devtool: 'source-map',
    module: {
      rules: [
        { test: /\.(frag|vert|glsl)$/, use: [{ loader: 'glsl-shader-loader' }] },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
          },
        },
        {
          test: /\.svg$/,
          use: [{ loader: '@svgr/webpack', options: { typescript: true, ext: 'tsx' } }],
        },
        { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      ],
    },
    externals: isDev ? {} : { react: 'React', 'react-dom': 'ReactDOM' },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
      alias: {
        react: path.resolve(__dirname, 'node_modules/react'),
        'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      }
    },
    plugins: [
      ...(isDev ? [] : [new DependencyExtractionWebpackPlugin()]),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: 'body',
        chunks: ['index'],
      }),
      // new CopyPlugin({ patterns: [{ from: 'src/img', to: 'img' }] }),
      new RemoveCodeBetweenCommentsPlugin({ startComment: 'sr:s', endComment: 'sr:e' }),
      new webpack.DefinePlugin({
        "process.env.BUILD_TARGET": JSON.stringify("editor"),
        __IS_EDITOR__: JSON.stringify(true),
        __IS_SITE__: JSON.stringify(false),
        __DEV__: JSON.stringify(isDev),
      }),
      // new BundleAnalyzerPlugin(),
      //  ...(isDev ? [] : [new BundleAnalyzerPlugin()]),
    ],
    optimization: getOptimization(true),
    devServer: {
      host: '0.0.0.0',
      port: 3000,
      hot: true,
      liveReload: true,
      client: {
        webSocketURL: { protocol: 'ws', hostname: 'ip-user.test', port: 3000, pathname: '/ws' },
      },
      headers: { 'Access-Control-Allow-Origin': '*' },
      allowedHosts: 'all',
    },
  };

  // Render bundle config
  const renderConfig = {
    mode: isDev ? 'development' : 'production',
    entry: { render: "./src/RenderEngine/siteRender.tsx" },
    output: {
      path: path.resolve(__dirname, 'dist', renderFolder),
      filename: '[name].js',
      chunkFilename: '[name].[contenthash].js',
      clean: true,
    },
    devtool: 'source-map',
    module: {
      rules: [
        { test: /\.(frag|vert|glsl)$/, use: [{ loader: 'glsl-shader-loader' }] },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
          },
        },
        {
          test: /\.svg$/,
          use: [{ loader: '@svgr/webpack', options: { typescript: true, ext: 'tsx' } }],
        },
        { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      ],
    },
    externals: isDev ? {} : { react: 'React', 'react-dom': 'ReactDOM' },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
      alias: {
        react: path.resolve(__dirname, 'node_modules/react'),
        'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      }
    },
    plugins: [
      ...(isDev ? [] : [new DependencyExtractionWebpackPlugin()]),
      new RemoveCodeBetweenCommentsPlugin({ startComment: 'p:s', endComment: 'p:e' }),
      new webpack.DefinePlugin({
        "process.env.BUILD_TARGET": JSON.stringify("site"),
        __DEV__: JSON.stringify(isDev),
        __IS_EDITOR__: JSON.stringify(false),
        __IS_SITE__: JSON.stringify(true),
      }),
      ...(isDev ? [] : [new BundleAnalyzerPlugin()]),
    ],
    optimization: getOptimization(false),
  };

  return [indexConfig, renderConfig];
};