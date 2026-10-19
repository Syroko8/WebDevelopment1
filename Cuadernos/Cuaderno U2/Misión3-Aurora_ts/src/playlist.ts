import type { Cancion, CampoOrden, Resultado } from './tipos';

export const cancionesIniciales: Cancion[] = [
  { id: 1, titulo: "Midnight City", artista: "M83", genero: "synthpop", duracion: 243, favorita: false },
  { id: 2, titulo: "Clair de Lune", artista: "Debussy", genero: "clásica", duracion: 300, favorita: false },
  { id: 3, titulo: "Bohemian Rhapsody", artista: "Queen", genero: "rock", duracion: 354, favorita: false },
  { id: 4, titulo: "Resonance", artista: "HOME", genero: "synthpop", duracion: 212, favorita: false },
  { id: 5, titulo: "Symphony No. 5", artista: "Beethoven", genero: "clásica", duracion: 176, favorita: false }
];

// Historial para el reto extra de deshacer
let historial: Cancion[][] = [];

// 1. Operaciones básicas (array nuevo inmutable)
export function agregar(lista: Cancion[], nueva: Omit<Cancion, 'id'>): Cancion[] {
  return [...lista, { ...nueva, id: Date.now() }];
}

export function eliminar(lista: Cancion[], id: number): Cancion[] {
  return lista.filter(c => c.id !== id);
}

export function alternarFavorita(lista: Cancion[], id: number): Cancion[] {
  return lista.map(c => c.id === id ? { ...c, favorita: !c.favorita } : c);
}

// 2. Consultas
export function duracionTotal(lista: Cancion[]): string {
  const totalSegundos = lista.reduce((acc, c) => acc + c.duracion, 0);
  const minutos = Math.floor(totalSegundos / 60);
  const segundos = totalSegundos % 60;
  return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

export function ordenarPor(lista: Cancion[], campo: CampoOrden): Cancion[] {
  return [...lista].sort((a, b) => {
    const valA = a[campo];
    const valB = b[campo];
    if (typeof valA === 'string' && typeof valB === 'string') {
      return valA.localeCompare(valB);
    }
    return (valA as number) - (valB as number);
  });
}

// porGenero usando reduce compatible con todos los targets de TS
export function porGenero(lista: Cancion[]): Partial<Record<string, Cancion[]>> {
  return lista.reduce<Record<string, Cancion[]>>((acc, cancion) => {
    const genero = cancion.genero;
    if (!acc[genero]) {
      acc[genero] = [];
    }
    acc[genero].push(cancion);
    return acc;
  }, {});
}

// 3. Instantáneas y Deshacer con structuredClone
export function crearInstantanea(lista: Cancion[]): Cancion[] {
  const copia = structuredClone(lista);
  historial.push(structuredClone(lista));
  return copia;
}

export function deshacer(): Cancion[] | null {
  if (historial.length <= 1) return null;
  historial.pop();
  return structuredClone(historial[historial.length - 1]);
}

// 4. Búsqueda sin tildes ni mayúsculas
export function buscar(lista: Cancion[], texto: string): Cancion[] {
  const normalizar = (str: string) => 
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  
  const query = normalizar(texto);
  return lista.filter(c => 
    normalizar(c.titulo).includes(query) || normalizar(c.artista).includes(query)
  );
}

// 5. Persistencia y Cargar con tipo Resultado<T>
export function guardar(lista: Cancion[]): void {
  localStorage.setItem("aurora-fm", JSON.stringify(lista));
}

export function cargar(): Resultado<Cancion[]> {
  try {
    const datos = localStorage.getItem("aurora-fm");
    if (!datos) return { ok: true, valor: cancionesIniciales };
    const parsed = JSON.parse(datos) as Cancion[];
    return { ok: true, valor: Array.isArray(parsed) ? parsed : cancionesIniciales };
  } catch (e) {
    return { ok: false, error: "JSON corrupto en localStorage" };
  }
}

// 6. Genérico propio 'ultima'
export function ultima<T>(lista: T[]): T | undefined {
  return lista[lista.length - 1];
}