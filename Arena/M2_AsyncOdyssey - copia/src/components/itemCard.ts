import type { ItemInfo } from '../model/itemInfo';

export function createItemCard(item: ItemInfo): HTMLElement {
  const card = document.createElement('div');
  card.className = 'item-card';
  card.innerHTML = `
    <img src="${item.image}" alt="${item.titleEnglish}" class="front-image" />
    <div class="title-wrap">
        <p>${item.titleEnglish}</p>
    </div>
  `;
  return card;
}
