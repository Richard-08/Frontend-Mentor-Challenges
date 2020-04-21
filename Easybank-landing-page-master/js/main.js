const burger = document.querySelector('.nav__burger');
const menu = document.querySelector('.nav__items');

function showMenu() {
    menu.classList.toggle('show');
    burger.classList.toggle('open');
}

burger.addEventListener('click', () => {
    showMenu();
})