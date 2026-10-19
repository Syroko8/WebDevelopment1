import { cancionesIniciales, duracionTotal, porGenero, crearInstantanea } from './playlist.js';

console.log("Duración total:", duracionTotal(cancionesIniciales));
console.log("Por género:", porGenero(cancionesIniciales));
const copia = crearInstantanea(cancionesIniciales);
copia[0].titulo = "Modificado";
console.log("¿El original se mantiene inmutable?", cancionesIniciales[0].titulo === "Midnight City"); // true[cite: 5]