import '../css/styles.scss';
let logoDevex = require('../img/icon.png');
console.clear();
class Persona {
  saludo() {
    console.log("Hola");
  }
}

let p = new Persona();
p.saludo();

function hola() {
  console.log("hola");
}
hola(); hola(); hola();
if (module.hot) {
  module.hot.accept();
}

let app = document.getElementById('app');
app.innerHTML = `<img src="${logoDevex}" alt="Logo devex"/>`;
