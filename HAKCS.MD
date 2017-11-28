In CescoPlugin in folder lib in file favicons.js add
In line 98 aprox after ```result.files.forEach(function (file) {```
````js
if (file.name === 'manifest.json') {
  var finalManifes = JSON.parse(file.contents);
  finalManifes.scope = '.';
  finalManifes.short_name = 'PWAGram';
  file.contents = JSON.stringify(finalManifes, null, 4);
}
```
