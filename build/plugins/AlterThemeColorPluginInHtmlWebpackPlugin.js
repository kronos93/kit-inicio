var c = console.log;
function AlterThemeColorPluginInHtmlWebpackPlugin(config) {
  this.theme_color = config.theme_color;
  this.background = config.background;
}
AlterThemeColorPluginInHtmlWebpackPlugin.prototype.apply = function (compiler) {
  //console.log(this.theme_color);
  var theme_color = this.theme_color;
  var background = this.background;
  compiler.plugin('compilation', function (compilation) {
    //c('El compilador esta iniciando una nueva compilación');
    compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
      htmlPluginData.html = htmlPluginData.html.replace(/\/\.\//g, '/').replace(`<meta name="theme-color" content="${background}">`, `<meta name="theme-color" content="${theme_color}">`);
      callback(null, htmlPluginData);
    });
  });
};

module.exports = AlterThemeColorPluginInHtmlWebpackPlugin;
