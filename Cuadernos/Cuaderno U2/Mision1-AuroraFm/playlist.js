// Datos de partida que suman exactamente 21 minutos y 25 segundos[cite: 5]
export const cancionesIniciales = [
  { id: 1, titulo: "Midnight City", artista: "M83", genero: "synthpop", duracion: 243, favorita: false },
  { id: 2, titulo: "Claro de Luna", artista: "Debussy", genero: "clásica", duracion: 300, favorita: true },
  { id: 3, titulo: "Bohemian Rhapsody", artista: "Queen", genero: "rock", duracion: 354, favorita: false },
  { id: 4, titulo: "Starlight", artista: "Muse", genero: "rock", duracion: 239, favorita: false },
  { id: 5, titulo: "Enjoy the Silence", artista: "Depeche Mode", genero: "synthpop", duracion: 149, favorita: true }
];

export const agregar = (lista, cancion) => [...lista, cancion];
export const eliminar = (lista, id) => lista.filter(c => c.id !== id);
export const alternarFavorita = (lista, id) => lista.map(c => c.id === id ? { ...c, favorita: !c.favorita } : c);

export const duracionTotal = (lista) => {
  const totalSegundos = lista.reduce((acc, c) => acc + c.duracion, 0);
  const mins = Math.floor(totalSegundos / 60);
  const secs = totalSegundos % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const ordenarPor = (lista, campo) => lista.toSorted((a, b) => {
  if (a[campo] < b[campo]) return -1;
  if (a[campo] > b[campo]) return 1;
  return 0;
});

export const porGenero = (lista) => Object.groupBy(lista, c => c.genero);

export const crearInstantanea = (lista) => structuredClone(lista);

export const guardar = (lista) => localStorage.setItem("aurora-fm", JSON.stringify(lista));

export const cargar = () => {
  try {
    const data = localStorage.getItem("aurora-fm");
    if (!data) return cancionesIniciales;
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) throw new Error("Datos corruptos");
    return parsed;
  } catch (error) {
    return cancionesIniciales; // JSON corrupto devuelve el original[cite: 1]
  }
};

let historial = [];
export const deshacer = () => historial.pop() || cancionesIniciales;
export const buscar = (lista, texto) => {
  const t = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  return lista.filter(c => 
    c.titulo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(t) ||
    c.artista.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(t)
  );
};