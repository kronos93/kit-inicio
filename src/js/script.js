import '../css/styles.scss';
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
