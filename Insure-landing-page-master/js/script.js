const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu');

function toggleMenu() {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('lock');
}

burger.addEventListener('click', toggleMenu);