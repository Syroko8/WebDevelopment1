import { filters, emitSearch, TYPE_CHANGE } from '../main';
import { GENRES } from '../model/genres';
import type { Seasons, AiringStatus, ItemTypes } from '../model/filters';

const form = document.querySelector<HTMLFormElement>('#filter-form')!;
const nameInput = form.querySelector<HTMLInputElement>('[name="name"]')!;
const yearInput = form.querySelector<HTMLInputElement>('[name="year"]')!;
const seasonSelect = form.querySelector<HTMLSelectElement>('[name="season"]')!;
const statusSelect = form.querySelector<HTMLSelectElement>('[name="airingStatus"]')!;
const genreSearch = form.querySelector<HTMLInputElement>('#genre-search')!;
const genreList = form.querySelector<HTMLElement>('#genre-list')!;
const genreCount = form.querySelector<HTMLElement>('#genre-count')!;

// --- Genres: built from the list; checked state lives in the checkboxes ---
GENRES.forEach(genre => {
    const label = document.createElement('label');
    label.className = 'genre-option';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = genre;

    const text = document.createElement('span');
    text.textContent = genre; // textContent, not innerHTML

    label.append(checkbox, text);
    genreList.append(label);
});

const options = Array.from(genreList.querySelectorAll<HTMLLabelElement>('.genre-option'));
const noMatches = document.querySelector<HTMLElement>('#genre-empty')!;

// Hide (don't remove) non-matching genres, so a checked one stays checked while filtered out.
genreSearch.addEventListener('input', () => {
    const query = genreSearch.value.trim().toLowerCase();
    let visible = 0;
    options.forEach(option => {
        const match = option.textContent!.toLowerCase().includes(query);
        option.hidden = !match;
        if (match) visible++;
    });
    noMatches.hidden = visible > 0;
});

// Enter in the genre box should filter the list, not submit the whole form.
genreSearch.addEventListener('keydown', e => {
    if (e.key === 'Enter') e.preventDefault();
});

function checkedGenres(): string[] {
    return Array.from(genreList.querySelectorAll<HTMLInputElement>('input:checked'))
        .map(input => input.value);
}

genreList.addEventListener('change', () => {
    const count = checkedGenres().length;
    genreCount.textContent = count ? `${count} selected` : '';
});

// --- Season only exists for anime ---
function syncSeasonAvailability(type: ItemTypes) {
    const isManga = type === 'manga';
    seasonSelect.disabled = isManga;
    if (isManga) seasonSelect.value = '';
}

document.addEventListener(TYPE_CHANGE, e =>
    syncSeasonAvailability((e as CustomEvent<ItemTypes>).detail)
);
syncSeasonAvailability(filters.type);

// --- Search: copy the form into the shared filters, then notify listeners ---
form.addEventListener('submit', e => {
    e.preventDefault();
    filters.name = nameInput.value.trim();
    filters.genresTags = checkedGenres();
    filters.year = yearInput.value.trim();
    filters.season = seasonSelect.value as Seasons | '';
    filters.airingStatus = statusSelect.value as AiringStatus | '';
    emitSearch();
});
