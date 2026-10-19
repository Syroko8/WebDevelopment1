// Datos de partida (5 canciones: suma total exactamente 1285s = 21:25)
export const cancionesIniciales = [
    { id: 1, titulo: "Midnight City", artista: "M83", genero: "synthpop", duracion: 243, favorita: false },
    { id: 2, titulo: "Starless", artista: "King Crimson", genero: "rock", duracion: 262, favorita: false },
    { id: 3, titulo: "Computer World", artista: "Kraftwerk", genero: "synthpop", duracion: 240, favorita: false },
    { id: 4, titulo: "Bohemian Rhapsody", artista: "Queen", genero: "rock", duracion: 355, favorita: false },
    { id: 5, titulo: "Clair de Lune", artista: "Debussy", genero: "clásica", duracion: 185, favorita: false }
];

// Operaciones inmutables
export function agregar(lista, nuevaCancion) {
    return [...lista, { ...nuevaCancion }];
}

export function eliminar(lista, id) {
    return lista.filter(cancion => cancion.id !== id);
}

export function alternarFavorita(lista, id) {
    return lista.map(cancion => 
        cancion.id === id ? { ...cancion, favorita: !cancion.favorita } : cancion
    );
}

// Consultas
export function duracionTotal(lista) {
    const totalSegs = lista.reduce((acc, c) => acc + c.duracion, 0);
    const mins = Math.floor(totalSegs / 60);
    const segs = String(totalSegs % 60).padStart(2, "0");
    return `${mins}:${segs}`;
}

export function ordenarPor(lista, campo) {
    return lista.toSorted((a, b) => {
        if (typeof a[campo] === "string") return a[campo].localeCompare(b[campo]);
        return a[campo] - b[campo];
    });
}

export function porGenero(lista) {
    return Object.groupBy(lista, cancion => cancion.genero);
}

// Instantáneas y persistencia
export function crearInstantanea(lista) {
    return structuredClone(lista);
}

export function guardar(lista) {
    localStorage.setItem("aurora-fm", JSON.stringify(lista));
}

export function cargar() {
    try {
        const datos = localStorage.getItem("aurora-fm");
        if (!datos) return cancionesIniciales;
        const parseados = JSON.parse(datos);
        return Array.isArray(parseados) ? parseados : cancionesIniciales;
    } catch {
        return cancionesIniciales;
    }
}

// Retos Extra: Historial e Insensibilidad a mayúsculas/tildes
const historial = [];

export function guardarEnHistorial(lista) {
    historial.push(structuredClone(lista));
}

export function deshacer() {
    return historial.pop() || null;
}

export function buscar(lista, texto) {
    const normalizar = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const query = normalizar(texto);
    return lista.filter(c => 
        normalizar(c.titulo).includes(query) || normalizar(c.artista).includes(query)
    );
}