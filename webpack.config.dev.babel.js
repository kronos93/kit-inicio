import webpack from 'webpack';
import { resolve, join } from 'path'; //http://tips.tutorialhorizon.com/2017/05/01/path-join-vs-path-resolve-in-node-js/
import dotenv from 'dotenv-extended';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPluginCesco from 'favicons-webpack-plugin-cesco';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';
import AlterThemeColorPluginInHtmlWebpackPlugin from './build/plugins/AlterThemeColorPluginInHtmlWebpackPlugin';
import os from 'os';
//Import env vars
let envConfig = dotenv.load({
  errorOnMissing: true,
  path: './.webpack.env',
});

const srcDir = resolve(__dirname, './src');
const publicDir = resolve(__dirname, './public');
const publicDirAssets = resolve(__dirname, './public/assets');

//Get command to init the script and build a absolute path
let comm_exec = process.env.npm_lifecycle_event;
if (comm_exec === 'dev:local') {
  if (/(win)/i.test(os.platform())) {
    let indexHtdocs = publicDir.indexOf('htdocs');
    if (indexHtdocs >= 0) {
      let temp_url = publicDir.substr(indexHtdocs, publicDir.length);
      //When access in remote devices, this need the port to use like 8080 for redirect
      envConfig.DEV_PUBLIC_PATH = temp_url.replace(/\\/g, '/').replace('htdocs', 'http://localhost').concat('/');
    }
  }
} else if (comm_exec === 'dev:external') {
  let interfaces = os.networkInterfaces();
  let addresses = [];
  for (let i in interfaces) {
    for (let i2 in interfaces[i]) {
      var address = interfaces[i][i2];
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push(address.address);
      }
    }
  }
  if (/(win)/i.test(os.platform())) {
    let indexHtdocs = publicDir.indexOf('htdocs');
    let ip = addresses.pop();
    if (indexHtdocs >= 0) {
      let temp_url = publicDir.substr(indexHtdocs, publicDir.length);
      envConfig.DEV_PUBLIC_PATH = temp_url.replace(/\\/g, '/').replace('htdocs', 'http://' + ip).concat('/');
      console.log('Run on: ' + envConfig.DEV_PUBLIC_PATH);
    }
  }
}
//Paths to clean in public dir
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
  // Write logs to console.
  verbose: false,
  // Instead of removing whole path recursively,
  // remove all path's content with exclusion of provided immediate children.
  // Good for not removing shared files from build directories.
  //exclude: ['./folder'],
};
export default (env, args) => {
  let config = {
    context: srcDir,// string (absolute path!)
    // the home directory for webpack
    // the entry and module.rules.loader option
    //   is resolved relative to this directory
    devtool: envConfig.DEV_DEVTOOL, // enum
    // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.
    entry: { // string | object | array
      // Here the application starts executing
      // and webpack starts bundling
      app: ['./js/app.js'],
    },
    output: {
      // options related to how webpack emits results
      path: publicDir, // string
      // the target directory for all output files
      // must be an absolute path (use the Node.js path module)
      publicPath: envConfig.DEV_PUBLIC_PATH, // string
      // the url to the output directory resolved relative to the HTML page
      // En el ambiente de desarrollo usando webpack-dev-server usar la url absoluta / funciona
      // Debido a que la aplicación corre en http://localhost:[port]/ y la barra diagonal (slash) / redirige a la raíz que es el mismo http://localhost:[port]/
      // En el caso de producción esto podría no aplicar igual****
      filename: './assets/js/[name].js', // for multiple entry points
      // the filename template for entry chunks
      sourceMapFilename: "./assets/js/sourcemaps/[file].map", // string
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
          use: [
            {
              loader: 'style-loader',
              options: {
                hmr: true,
                sourceMap: true,
                convertToAbsoluteUrls: true
              }
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
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
        },
        //Images
        {
          test: /\.(jpe?g|png|gif|webp|svg)$/i,
          exclude: /fonts?/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]",
                publicPath: envConfig.DEV_PUBLIC_PATH,
                outputPath: 'assets/',
              }
            },
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
                name: "[path][name].[ext]",
                publicPath: envConfig.DEV_PUBLIC_PATH,
                outputPath: 'assets/fonts/',
              }
            }
          ]
        },
        //Media
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
      new CleanWebpackPlugin(pathsToClean, cleanOptions),
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
          background: envConfig.BACKGROUND,             // Background colour for flattened icons. `string`, in meta is theme_color :(
          theme_color: envConfig.THEME_COLOR,            // Theme color for browser chrome. `string`
          path: envConfig.DEV_PUBLIC_PATH,                      // Path for overriding default icons path. `string`
          display: "standalone",          // Android display: "browser" or "standalone". `string`
          orientation: "portrait",        // Android orientation: "portrait" or "landscape". `string`
          start_url: "/?utm_source=homescreen",    // Android start application's URL. `string`
          version: "1.0.0",                 // Your application's version number. `number`
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
      new HtmlWebpackPlugin({
        title: 'Kit de inicio',
        msg: 'DevexTeam <3, cambiado al mundo una línea de código a la vez',
        template: './index.pug',
        filename: './index.html',
        minify: false, // { collapseWhitespace: true, removeComments: true }
      }),
      new HtmlWebpackPlugin({
        title: 'Kit de inicio',
        msg: 'DevexTeam <3, cambiado al mundo una línea de código a la vez',
        template: './index.html',
        filename: './site.html',
        minify: false, // { collapseWhitespace: true, removeComments: true }
      }),
      //Plugins personalizados :D
      new AlterThemeColorPluginInHtmlWebpackPlugin({
        background: envConfig.BACKGROUND,
        theme_color: envConfig.THEME_COLOR
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      // do not emit compiled assets that include errors
    ],
    //https://webpack.js.org/configuration/dev-server/
    devServer: {
      contentBase: publicDir,
      publicPath: envConfig.DEV_PUBLIC_PATH,
      port: envConfig.PORT,
      historyApiFallback: true,  // respond to 404s with index.html
      compress: true,
      hot: true,  // enable HMR on the server
      noInfo: true, // only errors & warns on hot reload
      inline: true,
      open: true,
      openPage: '',
      stats: envConfig.STATS,
      //host: "0.0.0.0",
    },
    stats: envConfig.STATS,
  };
  //[HMR]
  if (comm_exec === 'start') {
    config.plugins.push(new webpack.NamedModulesPlugin());
    // prints more readable module names in the browser console on HMR updates
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    // enable HMR globally
  }

  return config;
};
