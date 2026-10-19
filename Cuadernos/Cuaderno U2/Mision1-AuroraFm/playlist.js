// 5 canciones iniciales cuya duración suma exactamente 1285 segundos (21:25)
export const cancionesIniciales = [
  { id: 1, titulo: "Midnight City", artista: "M83", genero: "synthpop", duracion: 243, favorita: false },
  { id: 2, titulo: "Clair de Lune", artista: "Debussy", genero: "clásica", duracion: 300, favorita: false },
  { id: 3, titulo: "Bohemian Rhapsody", artista: "Queen", genero: "rock", duracion: 354, favorita: false },
  { id: 4, titulo: "Resonance", artista: "HOME", genero: "synthpop", duracion: 212, favorita: false },
  { id: 5, titulo: "Symphony No. 5", artista: "Beethoven", genero: "clásica", duracion: 176, favorita: false }
];

// Historial para el reto extra de deshacer
let historial = [];

// 1. Operaciones básicas (devuelven un nuevo array sin mutar)
export function agregar(lista, nuevaCancion) {
  return [...lista, { ...nuevaCancion, id: Date.now() }];
}

export function eliminar(lista, id) {
  return lista.filter(cancion => cancion.id !== id);
}

export function alternarFavorita(lista, id) {
  return lista.map(cancion => 
    cancion.id === id ? { ...cancion, favorita: !cancion.favorita } : cancion
  );
}

// 2. Consultas
export function duracionTotal(lista) {
  const totalSegundos = lista.reduce((acc, c) => acc + c.duracion, 0);
  const minutos = Math.floor(totalSegundos / 60);
  const segundos = totalSegundos % 60;
  return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

export function ordenarPor(lista, campo) {
  return lista.toSorted((a, b) => {
    if (typeof a[campo] === 'string') {
      return a[campo].localeCompare(b[campo]);
    }
    return a[campo] - b[campo];
  });
}

export function porGenero(lista) {
  return Object.groupBy(lista, cancion => cancion.genero);
}

// 3. Instantáneas con structuredClone
export function crearInstantanea(lista) {
  const copia = structuredClone(lista);
  historial.push(structuredClone(lista));
  return copia;
}

// Reto Extra: Deshacer
export function deshacer() {
  if (historial.length <= 1) return null;
  historial.pop(); // Elimina estado actual
  return structuredClone(historial[historial.length - 1]);
}

// Reto Extra: Buscar sin tildes ni mayúsculas
export function buscar(lista, texto) {
  const normalizar = (str) => 
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  
  const query = normalizar(texto);
  return lista.filter(c => 
    normalizar(c.titulo).includes(query) || normalizar(c.artista).includes(query)
  );
}

// 4. Persistencia en localStorage
export function guardar(lista) {
  localStorage.setItem("aurora-fm", JSON.stringify(lista));
}

export function cargar() {
  try {
    const datos = localStorage.getItem("aurora-fm");
    if (!datos) return cancionesIniciales;
    const parsed = JSON.parse(datos);
    return Array.isArray(parsed) ? parsed : cancionesIniciales;
  } catch (e) {
    console.warn("JSON corrupto detectado en localStorage. Cargando canciones iniciales.");
    return cancionesIniciales;
  }
}