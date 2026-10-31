import '../main'
import { UIInfo } from '../main';
import { genres } from '../model/genres';

const seasonsSelect = document.querySelector('#seasons') as HTMLSelectElement;
const airingStatusSelect = document.getElementById('airingStatus') as HTMLInputElement;
const genreSearch = document.getElementById('genre-search') as HTMLInputElement;
const genreList = document.getElementById('genre-list') as HTMLElement;
const genreCount = document.getElementById('genre-count') as HTMLElement;
const mangaButton = document.querySelector('.manga-selector') as HTMLButtonElement;
const animeButton = document.querySelector('.anime-selector') as HTMLButtonElement;
const nameInput = document.querySelector('#name') as HTMLInputElement;
const yearInput = document.querySelector('#year') as HTMLInputElement;

export const airingStatus = ['Any', 'Airing' , 'Finished' , 'Not Yet Aired' , 'Cancelled'];
export type AiringStatus = typeof airingStatus[number];
export const seasons = ['Any', 'Winter' , 'Spring' , 'Summer' , 'Fall'];
export type Seasons = typeof seasons[number];


const selected = new Set<string>();
const optionElements = new Map<string, HTMLButtonElement>();

generateOptions();
loadGenres();

// Generamos opciones para los selects.
function generateOptions() {
    airingStatus.forEach(status => {
        let option = document.createElement('option');
        option.innerText = status;
        airingStatusSelect?.appendChild(option);
    });
    
    seasons.forEach(season => {
        let option = document.createElement('option');
        option.innerText = season;
        seasonsSelect?.appendChild(option);
    })
}

// Mostramos los géneros de anime o manga.
function loadGenres() {
    genres.forEach(genre => {
        const newGenre = document.createElement('button');
        newGenre.type = 'button';
        newGenre.className = 'genre-option';
        newGenre.textContent = genre.name;
        newGenre.dataset.genre = genre.name;
        optionElements.set(genre.name, newGenre);
        genreList.append(newGenre);
    });
}

// Obtenemos los géneros que coincidan.
function fetchCoincidences() {
    const query = genreSearch.value.trim().toLowerCase();

    genres.forEach(genre => {
        const available = UIInfo.type === 'manga' || genre.animeId != null;
        /* Dependiendo de si la búsqueda está en el nombre del género, establecemos un 
        valor en la propiedad hidden.*/
        const matches = genre.name.toLowerCase().includes(query);
        optionElements.get(genre.name)!.hidden = !(available && matches);
    });
}

function switchFilterType() {
    mangaButton.disabled = UIInfo.type == 'manga';
    animeButton.disabled = UIInfo.type == 'anime';
    seasonsSelect.disabled = UIInfo.type == 'manga';
    airingStatusSelect.disabled = UIInfo.type == 'manga';
    fetchCoincidences();
}

animeButton.addEventListener('click', () => {
    UIInfo.type = 'anime';
    switchFilterType();
});

mangaButton.addEventListener('click', () => {
    UIInfo.type = 'manga';
    switchFilterType();
});

genreList.addEventListener('click', e => { 
    const selectedElement = (e.target as HTMLElement).closest<HTMLButtonElement>('.genre-option');
    // Si se devuelve un null, no se ha clicado en un botón.
    if (!selectedElement) return;

    const name = selectedElement?.dataset.genre!;
    // Comprobamos si el género está ya en el set de seleccionados.
    selected.has(name) ? selected.delete(name) : selected.add(name);

    // Aplicamos la clase apropiada.
    selectedElement?.classList.toggle('selected', selected.has(name));

    // Si hay elementos seleccionados mostramos el número.
    genreCount.innerText = selected.size? `${selected.size} selected` : '';

    // Sobreescribimos la lista de géneros con otra que contengalos elementos del set.
    UIInfo.genresTags = [...selected];
});

genreSearch.addEventListener('focus', () => {
    genreList.hidden = false;
    fetchCoincidences();
})

genreSearch.addEventListener('input', () => {
    fetchCoincidences();
});

genreSearch.addEventListener('keydown', e => {
    // Evitamos que al hacer enter se envíe el formulario.
    if (e.key === 'Enter') e.preventDefault();
});

document.addEventListener('click', e => {
    /* Si seleccionamos fuera de la barra de búsqueda de género o un 
    género escondemos la lista de géneros.*/
    if (!(e.target as HTMLElement).closest('.genre-field')) genreList.hidden = true;
});

seasonsSelect.addEventListener('change', () => {
    UIInfo.season = seasonsSelect.value;
});

airingStatusSelect?.addEventListener('change', () => {
    UIInfo.airingStatus = airingStatusSelect.value;
});

nameInput?.addEventListener('input', () => {
    UIInfo.name = nameInput.value;
});

yearInput?.addEventListener('input', () => {
    UIInfo.year = yearInput.value;
});