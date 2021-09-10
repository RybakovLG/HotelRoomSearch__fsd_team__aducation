const path = require('path'),
      Webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';

const pages = [
      'index',
      'landing-page',
      'search-room',
      // 'ui-kit',
      'registration-page',
      'sign-in-page',
      'room-details',
];

const entries = pages.reduce(
    (accumulator, page) => (
        { ...accumulator, ...{ [page]: `@pages/${page}/${page}.js` } }
    ), {},
);

const plugins = [];

pages.forEach((page) => {
  plugins.push(
      new HtmlWebpackPlugin({
        filename: `./${page}.html`,
        template: `./pages/${page}/${page}.pug`,
        chunks: [page]
      }),);
});


module.exports =  {

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@modules': path.resolve(__dirname, './node_modules'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    }
  },

  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: entries,

  output: {
    path: path.resolve(__dirname, 'app'),
    assetModuleFilename: "[path][name]_[contenthash]_[ext]",
    filename: 'js/[name]_[contenthash]_.js',
    hashDigestLength: 4,
    clean: true,
  },

  devServer: {
    hot: true,
    compress: true,
    port: 3001,
    open: true,
    liveReload: false,
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [{
          loader: 'pug-loader',
          options: { 'pretty': true}
        }],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          "css-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
            // 'style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [ path.resolve(__dirname, './src/styles/variables/variables.sass')],
            }}]
      },
      {
        test: /\.(ttf|woff|woff2)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|ico|json|webmanifest|xml|svg)$/i,
        include: /favicons/i,
        type: 'asset/resource',
        generator: {
          filename: '[path][name][ext]'
        }
      },
      {
        test: /\.(jpe?g|png|svg)/i,
        exclude: /2x|3x|favicons/,
        type: "asset/resource",
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              severityError: "warning",

              minimizerOptions: {
                plugins: [
                  ["mozjpeg", { quality: 75, tune: 'psnr', dct: 'float', sample: ['2x1'] }],
                  ["pngquant", { quality: [0.6, 0.8]}],
                  [ "svgo",
                    {
                      plugins: extendDefaultPlugins([
                        {
                          name: "removeViewBox",
                          active: false,
                        },
                ])}]]},},
          },
        ],
      },

      {
        test: /\.(jpe?g|png)/i,
        include: /2x|3x/,
        type: "asset/resource",
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
                severityError: "warning",

              minimizerOptions: {
                plugins: [
                  ["mozjpeg", { quality: 60, dct: 'float', sample: ['2x1'] }],
                  ["pngquant", { quality: [0.4, 0.6]}],
                ]},},
          },],
      },
    ],
  },

  plugins: [

    new Webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash]_.css',
      chunkFilename: "css/[id]_[contenthash]_.css",
      ignoreOrder: true,
    }),

  ].concat(plugins),

  devtool: isDev ? 'inline-source-map': false,

  optimization: {
    runtimeChunk: 'single',

    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 25000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // получает имя, то есть node_modules/packageName/not/this/part.js
            // или node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // имена npm-пакетов можно, не опасаясь проблем, использовать
            // в URL, но некоторые серверы не любят символы наподобие @
            return `npm.${packageName.replace('@', '')}`;
          }, }, },
    },
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
};