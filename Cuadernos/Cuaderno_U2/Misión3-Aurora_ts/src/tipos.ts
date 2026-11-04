export interface Cancion {
  readonly id: number; // Id de solo lectura
  titulo: string;
  artista: string;
  genero: string;
  duracion: number;
  favorita: boolean;
}

export type CampoOrden = 'titulo' | 'artista' | 'duracion' | 'genero';

// Reto Extra: Resultado Discriminated Union
export type Resultado<T> = 
  | { ok: true; valor: T }
  | { ok: false; error: string };