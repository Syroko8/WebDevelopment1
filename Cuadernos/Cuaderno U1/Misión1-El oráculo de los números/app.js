let secreto = Math.floor(Math.random() * 100) + 1;
let intentosMaximos = 7;
let intentosGastados = 0;
let historial = [];

const form = document.getElementById("guessForm");
const input = document.getElementById("textInput");
const resultText = document.getElementById("result");
const intentosText = document.getElementById("intentosText");
const historialText = document.getElementById("historialText");
const btnProbar = document.getElementById("btnProbar");
const btnReiniciar = document.getElementById("btnReiniciar");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const intento = Number(input.value);

    // Validación
    if (intento < 1 || intento > 100 || isNaN(intento)) {
        resultText.textContent = "Aviso: El número debe estar entre 1 y 100.";
        resultText.style.color = "orange";
        return;
    }

    intentosGastados++;
    historial.push(intento);
    
    // Comprobar resultado
    if (intento === secreto) {
        resultText.textContent = `¡Correcto! Lo lograste en ${intentosGastados} intentos.`;
        resultText.style.color = "green";
        terminarJuego();
    } else {
        const pista = intento < secreto ? "mayor" : "menor";
        resultText.textContent = `El secreto es ${pista}.`;
        resultText.style.color = "blue";
        
        if (intentosGastados >= intentosMaximos) {
            resultText.textContent = `¡Agotaste tus intentos! El secreto era ${secreto}.`;
            resultText.style.color = "red";
            terminarJuego();
        }
    }

    actualizarMarcador();
    input.value = "";
    input.focus();
});

btnReiniciar.addEventListener("click", () => {
    secreto = Math.floor(Math.random() * 100) + 1;
    intentosGastados = 0;
    historial = [];
    input.disabled = false;
    btnProbar.disabled = false;
    btnReiniciar.style.display = "none";
    resultText.textContent = "";
    actualizarMarcador();
});

function actualizarMarcador() {
    intentosText.textContent = `Intentos restantes: ${intentosMaximos - intentosGastados}`;
    historialText.textContent = historial.length > 0 ? `Has probado: ${historial.join(', ')}` : "";
}

function terminarJuego() {
    input.disabled = true;
    btnProbar.disabled = true;
    btnReiniciar.style.display = "inline-block";
}