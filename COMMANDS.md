# Descripción del proyecto

Esta utileria esta pensada para el desarrollo sobre un ambiente Windows y Xampp, se debe probar para extender su funcionalidad a diversos entornos.

## Comandos NPM disponibles

```js
"start": "webpack-dev-server --colors --config ./webpack.config.dev.babel.js",
"dev:local": "webpack -d --watch --colors --config ./webpack.config.dev.babel.js",
"dev:external": "webpack -d --watch --colors --config ./webpack.config.dev.babel.js",
"build": "",
"dash": "webpack-dashboard -c -- webpack-dev-server --config ./webpack.config.dev.babel.js --colors",
"clean": "rimraf ./public/*.png ./public/*.json ./public/*.html ./public/*.xml ./public/*.ico ./public/.cache ./public/*.webapp ./public/*.js ./public/assets/*",
"prod": "webpack --config ./webpack.config.prod.babel.js -p --env.prod --colors"
```

- npm start : Inicia un servidor de webpack con el archivo de configuración para desarrollo.
- dev:local : Ejecuta webpack en modo de desarrollo y precarga un publicPath desde localhost, habilitado para el trabajo en xampp*
- dev:external : Ejecuta webpack en modo de desarrollo y precarga un publicPath desde localhost con la IP local del equipo, habilitado para el trabajo en xampp*
