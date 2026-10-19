// Clases de error personalizada
export class ErrorPokedex extends Error {
  constructor(mensaje, codigo) {
    super(mensaje);
    this.name = "ErrorPokedex";
    this.codigo = codigo;
  }
}

// Reto Extra: Caché con Map[cite: 3]
const cachePokemon = new Map();

// Consulta básica con caché
export async function obtenerPokemon(nombre) {
  const query = nombre.toLowerCase().trim();
  if (cachePokemon.has(query)) return cachePokemon.get(query);

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!res.ok) {
      throw new ErrorPokedex(`Error al consultar "${nombre}": ${res.statusText}`, res.status);
    }
    const data = await res.json();
    const pokemon = {
      id: data.id,
      nombre: data.name,
      imagen: data.sprites.front_default,
      tipos: data.types.map(t => t.type.name),
      peso: data.weight
    };
    cachePokemon.set(query, pokemon);
    return pokemon;
  } catch (err) {
    if (err instanceof ErrorPokedex) throw err;
    throw new ErrorPokedex("Error de conexión de red", 0);
  }
}

// Timeout genérico con Promise.race y AbortController (Reto extra)[cite: 3, 4]
export function conTimeout(promesa, ms = 4000) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new ErrorPokedex("Tiempo de espera agotado", 408)), ms)
  );
  return Promise.race([promesa, timeout]);
}

// Carga en paralelo con Promise.all y medición de tiempo[cite: 3, 4]
export async function obtenerEquipo(nombres) {
  console.time("Carga en Paralelo (Promise.all)");
  const resultados = await Promise.all(nombres.map(n => conTimeout(obtenerPokemon(n))));
  console.timeEnd("Carga en Paralelo (Promise.all)");
  return resultados;
}

// Carga tolerante a fallos con Promise.allSettled[cite: 3, 4]
export async function obtenerEquipoSeguro(nombres) {
  const resultados = await Promise.allSettled(nombres.map(n => conTimeout(obtenerPokemon(n))));
  
  const capturados = [];
  const escapados = [];

  resultados.forEach(res => {
    if (res.status === 'fulfilled') {
      capturados.push(res.value);
    } else {
      escapados.push(res.reason.message || res.reason);
    }
  });

  return { capturados, escapados };
}