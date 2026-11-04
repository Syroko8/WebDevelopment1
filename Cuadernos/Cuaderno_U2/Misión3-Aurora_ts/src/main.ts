import { 
  cancionesIniciales, agregar, eliminar, alternarFavorita, 
  duracionTotal, ordenarPor, crearInstantanea, 
  deshacer, buscar, guardar, cargar, ultima 
} from './playlist';
import type { Cancion, CampoOrden } from './tipos';

const resCarga = cargar();
let miPlaylist: Cancion[] = resCarga.ok ? resCarga.valor : cancionesIniciales;
crearInstantanea(miPlaylist);

const playlistEl = document.getElementById('playlist') as HTMLUListElement;
const durationEl = document.getElementById('screen-duration') as HTMLSpanElement;

function render(lista: Cancion[] = miPlaylist) {
  if (!playlistEl || !durationEl) return;
  playlistEl.innerHTML = '';
  durationEl.textContent = `Duración Total: ${duracionTotal(lista)}`;

  lista.forEach(cancion => {
    const li = document.createElement('li');
    li.className = 'song-item';
    li.innerHTML = `
      <div class="song-info">
        <strong>${cancion.titulo}</strong> - ${cancion.artista} 
        <small>(${cancion.genero} | ${cancion.duracion}s)</small>
      </div>
      <div>
        <button class="fav-btn">${cancion.favorita ? '⭐' : '☆'}</button>
        <button class="del-btn">🗑️</button>
      </div>
    `;

    li.querySelector('.fav-btn')?.addEventListener('click', () => {
      miPlaylist = alternarFavorita(miPlaylist, cancion.id);
      render();
    });

    li.querySelector('.del-btn')?.addEventListener('click', () => {
      miPlaylist = eliminar(miPlaylist, cancion.id);
      render();
    });

    playlistEl.appendChild(li);
  });
}

// Event Listeners
document.getElementById('form-agregar')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const tituloInput = document.getElementById('titulo') as HTMLInputElement;
  const artistaInput = document.getElementById('artista') as HTMLInputElement;
  const generoInput = document.getElementById('genero') as HTMLSelectElement;
  const duracionInput = document.getElementById('duracion') as HTMLInputElement;

  const nueva = {
    titulo: tituloInput.value,
    artista: artistaInput.value,
    genero: generoInput.value,
    duracion: Number(duracionInput.value),
    favorita: false
  };

  miPlaylist = agregar(miPlaylist, nueva);
  crearInstantanea(miPlaylist);
  render();
  (e.target as HTMLFormElement).reset();
});

document.getElementById('input-buscar')?.addEventListener('input', (e) => {
  const query = (e.target as HTMLInputElement).value;
  render(buscar(miPlaylist, query));
});

document.getElementById('btn-ordenar-titulo')?.addEventListener('click', () => {
  miPlaylist = ordenarPor(miPlaylist, 'titulo' as CampoOrden);
  render();
});

document.getElementById('btn-ordenar-duracion')?.addEventListener('click', () => {
  miPlaylist = ordenarPor(miPlaylist, 'duracion' as CampoOrden);
  render();
});

document.getElementById('btn-instantanea')?.addEventListener('click', () => {
  crearInstantanea(miPlaylist);
  alert("Instantánea guardada en historial con structuredClone.");
});

document.getElementById('btn-deshacer')?.addEventListener('click', () => {
  const anterior = deshacer();
  if (anterior) {
    miPlaylist = anterior;
    render();
  } else {
    alert("No hay estados anteriores.");
  }
});

document.getElementById('btn-guardar')?.addEventListener('click', () => {
  guardar(miPlaylist);
  alert("Playlist guardada en localStorage.");
});

document.getElementById('btn-cargar')?.addEventListener('click', () => {
  const res = cargar();
  if (res.ok) {
    miPlaylist = res.valor;
    render();
  }
});

// Prueba del genérico 'ultima' sin any
console.log("Última canción:", ultima<Cancion>(miPlaylist));
console.log("Último género (string):", ultima<string>(["synthpop", "rock", "clásica"]));

render();