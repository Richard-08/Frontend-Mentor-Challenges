const toggleBtn = document.querySelector('.toggle');

function toggleMode() {
    document.body.classList.toggle('daymode');
}

toggleBtn.addEventListener('click', toggleMode);