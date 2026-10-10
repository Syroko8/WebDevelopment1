
const sidebar = document.querySelector('.sidebar')!;
const togglerContainer = document.querySelector('.toggler-container')!;
const title = sidebar.querySelector('.title')!;
const toggler = document.querySelector('.toggler')!;
const togglerBar = document.querySelector('.toggler-bar')!;
const filters = document.querySelector('.filters')!;

let enabledMenu = true;

renderSidebar();

function renderSidebar() {
  [sidebar, togglerContainer, title, togglerBar, filters].forEach(el =>
    el.classList.toggle('enabled', enabledMenu)
  );
}

toggler.addEventListener('click', () => {
  enabledMenu = !enabledMenu;
  renderSidebar();
});