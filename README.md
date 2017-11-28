#### Por leer:
Revisar el uso de `file-loader` con `url-loader` testeando los mismos tipos de archivos (ejemplo: `/\.(png|.jpe?g)$/i`) ya que causa conflictos el url-loader al hacer el fallback al file-loader
* [URL loader](https://github.com/webpack-contrib/url-loader)
```js
//Con el limite se tiene un tope antes de llamar al file-loader
{
  test: /\.(png|jpg|gif)$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8192,
         name: "./assets/img/[name].[ext]",
         fallback: 'file-loader'
       }
     }
   ]
 },
```
* [File loader](https://github.com/webpack-contrib/file-loader)
* [Img loader](https://github.com/tcoopman/image-webpack-loader)

[Utileria para postcss](http://browserl.ist/?q=>+5%25%2Cie+>+10) - Permite ver el rango de navegadores soportados por medio de los parametros de browsers asginados al package.json

---
#### Extenciones para chrome:
`chrome://extensions/`

- [AMP validator](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc?utm_source=chrome-app-launcher-info-dialog) - Validador para aplicaciones AMP
- [Video speed controller](https://chrome.google.com/webstore/detail/video-speed-controller/nffaoalbilbmmfgbnbgppjihopabppdk) - Acelerador de velocidad de reproducción para videos
- [Lightouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk) -Validador de PWA

Globals packages

npm install -g dotenv-extended
npm install -g webpack
npm install -g webpack-dev-server
npm install -g npm
npm install -g webpack-dashboard
#### Formas de tener un plugin en el archivo de configuración de webpack para hacer pruebas
```js
      function () {
        this.plugin('compilation', function (compilation) {
          compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
            console.log(htmlPluginData.html);
            callback(null, htmlPluginData);
          });
        });
      },
      function () {
        this.plugin('compilation', function (compilation) {
          compilation.plugin('module-asset', function (module, filename) {
            console.log(filename);
          });
        });
      },
      {
        apply: function (compiler) {
          compiler.plugin('compilation', function (compilation) {
            compilation.plugin('seal', function () {
              // var m = this.modules.filter(function (m) {
              //   return /\/style\.css$/.test(m.resource);
              // })[0];
              // console.log('compilation: ' + compilation.name);
              // console.log('fileDependencies:');
              // console.log(m.fileDependencies);
              console.log(this.modules.filter(function(_module){
                return /\.css$/.test(_module.resource);
              })[0]);
            });
          });
        }
      },
```
