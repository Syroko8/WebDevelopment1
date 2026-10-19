import { obtenerPokemon, obtenerEquipoSeguro, ErrorPokedex } from './pokedex.js';

const grid = document.getElementById('cards-grid');
const statusMsg = document.getElementById('status-msg');

function renderCards(pokemonList) {
  grid.innerHTML = pokemonList.map(p => `
    <div class="card">
      <img src="${p.imagen || 'https://via.placeholder.com/96'}" alt="${p.nombre}">
      <small>#${p.id}</small>
      <h3>${p.nombre}</h3>
      <p>Peso: ${p.peso}</p>
      <div>${p.tipos.map(t => `<span class="badge">${t}</span>`).join('')}</div>
    </div>
  `).join('');
}

document.getElementById('btn-buscar').addEventListener('click', async () => {
  const query = document.getElementById('poke-input').value;
  statusMsg.textContent = "Buscando...";
  statusMsg.style.color = "#333";

  try {
    const poke = await obtenerPokemon(query);
    renderCards([poke]);
    statusMsg.textContent = "¡Pokémon encontrado!";
  } catch (err) {
    grid.innerHTML = '';
    if (err instanceof ErrorPokedex) {
      statusMsg.textContent = `Error ${err.codigo}: ${err.message}`;
    } else {
      statusMsg.textContent = `Error inesperado: ${err.message}`;
    }
    statusMsg.style.color = "red";
  }
});

document.getElementById('btn-equipo-seguro').addEventListener('click', async () => {
  const equipoPrueba = ["pikachu", "misingno", "eevee", "charmander", "falso-poke", "snorlax"];
  statusMsg.textContent = "Cargando equipo seguro...";
  statusMsg.style.color = "#333";

  const { capturados, escapados } = await obtenerEquipoSeguro(equipoPrueba);
  renderCards(capturados);
  statusMsg.textContent = `Capturados: ${capturados.length} | Escapados: ${escapados.length} (${escapados.join(', ')})`;
  statusMsg.style.color = "green";
});