import { searchItems } from "../controller/itemController";
import { createItemCard } from "./itemCard";

const itemContainer = document.querySelector('.item-container') as HTMLElement;
const searchButton = document.querySelector('.search-button') as HTMLButtonElement;

searchButton.addEventListener('click', async () => {
    itemContainer.innerHTML = '<div class="inner"><p>Cargando...</p></div>';

    try {
        const items = await searchItems();

        if (items.length === 0) {
            itemContainer.innerHTML = '<div class="inner"><p>Sin resultados</p></div>';
            return;
        }

        // Una carta por cada resultado, dentro de un contenedor con rejilla.
        const grid = document.createElement('div');
        grid.className = 'inner cards-grid';
        items.forEach(item => grid.appendChild(createItemCard(item)));

        itemContainer.innerHTML = '';
        itemContainer.appendChild(grid);
    } catch (error) {
        itemContainer.innerHTML = '<div class="inner"><p>Error al buscar. Inténtalo de nuevo.</p></div>';
        console.error(error);
    }
});
