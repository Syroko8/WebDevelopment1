import { filters, emitTypeChange } from '../main';
import type { ItemTypes } from '../model/filters';

const cards = document.querySelectorAll<HTMLButtonElement>('.mode-card');

function select(mode: ItemTypes) {
    filters.type = mode;
    cards.forEach(card => {
        const isSelected = card.dataset.mode === mode;
        card.classList.toggle('selected', isSelected);
        card.setAttribute('aria-pressed', String(isSelected));
    });
    emitTypeChange();
}

cards.forEach(card =>
    card.addEventListener('click', () => select(card.dataset.mode as ItemTypes))
);

select(filters.type);
