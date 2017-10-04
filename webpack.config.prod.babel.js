import webpack from 'webpack';
import { resolve, join } from 'path'; //http://tips.tutorialhorizon.com/2017/05/01/path-join-vs-path-resolve-in-node-js/
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPluginCesco from 'favicons-webpack-plugin-cesco';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import PurifyCSSPlugin from "purifycss-webpack";
import glob from 'glob-all';
import DashboardPlugin from 'webpack-dashboard/plugin';
const srcDir = resolve(__dirname, './src');
const publicDir = resolve(__dirname, './public');
const publicDirAssets = resolve(__dirname, './public/assets');
const pathsToClean = [
  '.cache',
  '*.xml',
  '*.json',
  '*.webapp',
  '*.png',
  '*.ico',
  '*.html',
  '*.js',
  'assets',
];
const cleanOptions = {
  // Absolute path to your webpack root folder (paths appended to this)
  // Default: root of your package
  root: publicDir,
  // Instead of removing whole path recursively,
  // remove all path's content with exclusion of provided immediate children.
  // Good for not removing shared files from build directories.
  //exclude: ['./folder'],
};

export default {
  context: srcDir,// string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory
  devtool: "hidden-source-map", // enum
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.
  entry: { // string | object | array
    // Here the application starts executing
    // and webpack starts bundling
    script: ['babel-polyfill', './js/script.js'],
  },
  output: {
    // options related to how webpack emits results
    path: publicDir, // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    publicPath: "./", // string
    // the url to the output directory resolved relative to the HTML page
    filename: 'assets/js/[name].js', // for multiple entry points
    // the filename template for entry chunks
    sourceMapFilename: "assets/js/sourcemaps/[file].map", // string
    // the filename template of the source map location
  },
  module: {

    rules: [
      //JS and JSX - https://babeljs.io/docs/setup/#installation
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      //SASS - https://webpack.js.org/loaders/sass-loader/
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            }
          ],
          publicPath: "../../"
        })
      },
      {
        test: /\.(jpe?g|png|gif|webp|svg)$/i,
        exclude: /fonts?/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./assets/[path][name].[ext]"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true
            }
          }
        ]
      },
      //Pug https://github.com/pugjs/pug-loader
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      //Fonts
      {
        test: /(fonts?)+.*\.(ttf|eot|woff2?|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./assets/fonts/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(mp4|mp3|txt|xml)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./assets/media/[path][name].[ext]"
            }
          }
        ]
      }
    ],
  },
  plugins: [
    //new DashboardPlugin(),
    new FaviconsWebpackPluginCesco({
      // Your source logo
      logo: './icons/icon.png',
      // The prefix for all image files (might be a folder or a name)
      prefix: './',
      // Emit all stats of the generated icons
      emitStats: false,
      // The name of the json containing all favicon information
      statsFilename: 'iconstats-[hash].json',
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: true,
      // Inject the html into the html-webpack-plugin
      inject: true,
      //see https://github.com/haydenbleasel/favicons#usage)
      config: {
        appName: 'Kit de inicio',                  // Your application's name. `string`
        appDescription: 'Kit de inicio para proyectos ágiles',           // Your application's description. `string`
        developerName: 'Samuel R.',            // Your (or your developer's) name. `string`
        developerURL: "https://github.com/kronos93",             // Your (or your developer's) URL. `string`
        appleStatusBarStyle: 'black-translucent',
        lang: 'en-MX',
        background: "#FFF",             // Background colour for flattened icons. `string`
        theme_color: "#F4BA2C",            // Theme color for browser chrome. `string`
        path: "./",                      // Path for overriding default icons path. `string`
        display: "standalone",          // Android display: "browser" or "standalone". `string`
        orientation: "portrait",        // Android orientation: "portrait" or "landscape". `string`
        start_url: "./?utm_source=homescreen",    // Android start application's URL. `string`
        version: "1.0",                 // Your application's version number. `number`
        logging: false,                 // Print logs to console? `boolean`
        online: false,                  // Use RealFaviconGenerator to create favicons? `boolean`
        preferOnline: false,            // Use offline generation, if online generation has failed. `boolean`
        icons: {
          // Platform Options:
          // - offset - offset in percentage
          // - shadow - drop shadow for Android icons, available online only
          // - background:
          //   * false - use default
          //   * true - force use default, e.g. set background for Android icons
          //   * color - set background for the specified icons
          //
          android: true,              // Create Android homescreen icon. `boolean` or `{ offset, background, shadow }`
          appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset, background }`
          appleStartup: true,         // Create Apple startup images. `boolean` or `{ offset, background }`
          coast: { offset: 25 },      // Create Opera Coast icon with offset 25%. `boolean` or `{ offset, background }`
          favicons: true,             // Create regular favicons. `boolean`
          firefox: true,              // Create Firefox OS icons. `boolean` or `{ offset, background }`
          windows: true,              // Create Windows 8 tile icons. `boolean` or `{ background }`
          yandex: true                // Create Yandex browser icon. `boolean` or `{ background }`
        }
      }
    }),
    new ExtractTextPlugin({
      filename: "assets/css/style.css",
      disable: false,
      allChunks: true,
    }),
    //https://github.com/NMFR/optimize-css-assets-webpack-plugin
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true } }
    }),
    //https://github.com/webpack-contrib/purifycss-webpack
    new PurifyCSSPlugin({
      paths: glob.sync([
        join(__dirname, "src/**/*.pug"),
        join(__dirname, "src/**/*.html"),
        join(__dirname, "src/**/*.js")
      ]),
      purifyOptions: { whitelist: [".fa-github"] }
    }),
    new HtmlWebpackPlugin({
      title: 'Kit de inicio',
      msg: 'Difunde la palabra DevexTeam <3',
      filename: './index.html',
      template: './index.pug',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Kit de inicio',
      msg: 'Difunde la palabra DevexTeam <3',
      filename: './mensaje.html',
      template: './index.html',
      minify: false, // { collapseWhitespace: true, removeComments: true }
    }),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
  ],
  stats: "errors-only",
};
