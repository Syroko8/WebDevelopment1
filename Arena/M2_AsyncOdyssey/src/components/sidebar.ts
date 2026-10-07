import '../main'

const sidebar = document.querySelector('.sidebar')!;
const togglerContainer = document.querySelector('.toggler-container')!;
const title = sidebar.querySelector('.title')!;
const toggler = document.querySelector('.toggler')!;
const togglerBar = document.querySelector('.toggler-bar')!;

let enabledMenu = true;

function renderSidebar() {
  [sidebar, togglerContainer, title, togglerBar].forEach(el =>
    el.classList.toggle('enabled', enabledMenu)
  );
}

toggler.addEventListener('click', () => {
  enabledMenu = !enabledMenu;
  renderSidebar();
});

renderSidebar();