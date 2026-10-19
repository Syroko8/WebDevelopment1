// Función pura
function forjarClave(longitud, usarNumeros, usarSimbolos) {
    const letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numeros = "0123456789";
    const simbolos = "!@#$%&*?";
    
    let alfabeto = letras;
    if (usarNumeros) alfabeto += numeros;
    if (usarSimbolos) alfabeto += simbolos;

    let clave = "";
    for (let i = 0; i < longitud; i++) {
        const indiceAleatorio = Math.floor(Math.random() * alfabeto.length);
        clave += alfabeto[indiceAleatorio];
    }
    return clave;
}

// Conexión DOM
const btnGenerar = document.getElementById("btnGenerar");
const inputLongitud = document.getElementById("inputLongitud");
const chkNumeros = document.getElementById("chkNumeros");
const chkSimbolos = document.getElementById("chkSimbolos");
const claveSalida = document.getElementById("claveSalida");
const mensajeAviso = document.getElementById("mensajeAviso");

btnGenerar.addEventListener("click", () => {
    const longitud = Number(inputLongitud.value);
    
    if (longitud < 4 || longitud > 32) {
        mensajeAviso.textContent = "La longitud debe estar entre 4 y 32.";
        claveSalida.textContent = "-";
        return;
    }
    
    mensajeAviso.textContent = "";
    const clave = forjarClave(longitud, chkNumeros.checked, chkSimbolos.checked);
    claveSalida.textContent = clave;
});