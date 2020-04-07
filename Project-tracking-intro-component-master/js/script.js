const burger = document.querySelector('.burger');
const menu = document.querySelector('.nav-links');

function showMenu() {
    menu.classList.toggle('show');
    burger.classList.toggle('show');
}

burger.addEventListener('click', () => {
    showMenu();
})