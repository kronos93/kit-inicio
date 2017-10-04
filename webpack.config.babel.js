import webpack from 'webpack';

import DevConfig from './webpack.config.dev.babel';
import ProdConfig from './webpack.config.prod.babel';
//Utilerias
let c = console.log;
export default (env, args) => { //https://webpack.js.org/configuration/configuration-types/#exporting-a-function
  // c(env);
  // c(args);
  let isProduction = (env && env.prod) ? true : false;
  let config = isProduction ? ProdConfig : DevConfig;
  // c(isProduction);
  // c(config);
  return config;
};
