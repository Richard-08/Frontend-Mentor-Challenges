const toggle = document.querySelector('.toggle');

function toggleMode() {
    document.querySelector('.main').classList.toggle('month');
}

toggle.addEventListener('click', toggleMode);