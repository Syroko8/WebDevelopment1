import { 
  cancionesIniciales, agregar, eliminar, alternarFavorita, 
  duracionTotal, ordenarPor, porGenero, crearInstantanea, 
  deshacer, buscar, guardar, cargar 
} from './playlist.js';

let miPlaylist = cargar();
crearInstantanea(miPlaylist); // Estado inicial en historial[cite: 5]

const playlistEl = document.getElementById('playlist');
const durationEl = document.getElementById('screen-duration');

function render(lista = miPlaylist) {
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

    li.querySelector('.fav-btn').addEventListener('click', () => {
      miPlaylist = alternarFavorita(miPlaylist, cancion.id);
      render();
    });

    li.querySelector('.del-btn').addEventListener('click', () => {
      miPlaylist = eliminar(miPlaylist, cancion.id);
      render();
    });

    playlistEl.appendChild(li);
  });
}

// Event Listeners
document.getElementById('form-agregar').addEventListener('submit', (e) => {
  e.preventDefault();
  const nueva = {
    titulo: document.getElementById('titulo').value,
    artista: document.getElementById('artista').value,
    genero: document.getElementById('genero').value,
    duracion: Number(document.getElementById('duracion').value),
    favorita: false
  };
  miPlaylist = agregar(miPlaylist, nueva);
  crearInstantanea(miPlaylist);
  render();
  e.target.reset();
});

document.getElementById('input-buscar').addEventListener('input', (e) => {
  render(buscar(miPlaylist, e.target.value));
});

document.getElementById('btn-ordenar-titulo').addEventListener('click', () => {
  miPlaylist = ordenarPor(miPlaylist, 'titulo');
  render();
});

document.getElementById('btn-ordenar-duracion').addEventListener('click', () => {
  miPlaylist = ordenarPor(miPlaylist, 'duracion');
  render();
});

document.getElementById('btn-instantanea').addEventListener('click', () => {
  crearInstantanea(miPlaylist);
  alert("Instantánea clonada con structuredClone y guardada en el historial.");
});

document.getElementById('btn-deshacer').addEventListener('click', () => {
  const anterior = deshacer();
  if (anterior) {
    miPlaylist = anterior;
    render();
  } else {
    alert("No hay estados anteriores.");
  }
});

document.getElementById('btn-guardar').addEventListener('click', () => {
  guardar(miPlaylist);
  alert("Playlist guardada en localStorage.");
});

document.getElementById('btn-cargar').addEventListener('click', () => {
  miPlaylist = cargar();
  render();
});

// Verificación de inmutabilidad en consola[cite: 5]
console.log("--- DEMO DE INMUTABILIDAD ---");
console.log("Original antes:", cancionesIniciales);
duracionTotal(cancionesIniciales); // Devuelve "21:25"[cite: 5]
console.log("Original después:", cancionesIniciales);
console.log("Agrupación por género:", porGenero(cancionesIniciales));

render();