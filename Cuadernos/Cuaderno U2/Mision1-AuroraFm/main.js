import { 
    cancionesIniciales, agregar, duracionTotal, porGenero, 
    crearInstantanea, guardar, cargar, buscar 
} from "./playlist.js";

console.log("Duración total esperada (21:25):", duracionTotal(cancionesIniciales));

// Comprobación de inmutabilidad con structuredClone
const copia = crearInstantanea(cancionesIniciales);
copia[0].titulo = "Modificado";
console.log("Original intacto:", cancionesIniciales[0].titulo !== copia[0].titulo);

// Probar agrupamiento y búsqueda sin tildes
console.log("Por género:", porGenero(cancionesIniciales));
console.log("Búsqueda ('debussy'):", buscar(cancionesIniciales, "debussy"));

// Guardar y recuperar
guardar(cancionesIniciales);
console.log("Cargado de storage:", cargar());