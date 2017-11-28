import '../scss/app.scss';
console.clear();
let logoDevex = require('../img/icon.png');
let app = document.getElementById('app');
app.innerHTML = `<img src="${logoDevex}" alt="Logo devex"/>`;

class Persona {
  saludar() {
    console.log("Hola");
  }
}
let persona = new Persona();
persona.saludar();
if (module.hot) {
  module.hot.accept();
}

