const tarjeta = document.getElementById("tarjeta");
const inputNombre = document.getElementById("inputNombre");
const nombreTarjeta = document.getElementById("nombreTarjeta");
const btnTema = document.getElementById("btnTema");
const lemaSecreto = document.getElementById("lemaSecreto");

// 1. Holografía
tarjeta.addEventListener("mouseover", () => tarjeta.classList.add("brillo"));
tarjeta.addEventListener("mouseout", () => tarjeta.classList.remove("brillo"));

// 2. Edición en vivo
inputNombre.addEventListener("input", (e) => {
    const texto = e.target.value;
    nombreTarjeta.textContent = texto.trim() === "" ? "Tu nombre" : texto;
});

// 3. El alternador (Closure)
function crearAlternador(temas) {
    let indice = 0; // Estado privado
    return function() {
        indice = (indice + 1) % temas.length;
        return temas[indice];
    };
}

const clasesTemas = ["tema-0", "tema-1", "tema-2"];
const alternarTema = crearAlternador(clasesTemas);
let temaActual = clasesTemas[0];

// 4. Conectar el botón
btnTema.addEventListener("click", () => {
    tarjeta.classList.remove(temaActual);
    temaActual = alternarTema();
    tarjeta.classList.add(temaActual);
});

// 5. El secreto
document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "h") {
        lemaSecreto.classList.remove("oculto");
    }
});