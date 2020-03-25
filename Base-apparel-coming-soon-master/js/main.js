const form = document.querySelector('.form');
const email = document.querySelector('.email');

form.addEventListener('submit', e => {
    e.preventDefault();

    const emailValue = email.value;

    /* Check if it is a valid email */
    if (!isEmail(emailValue)) {
        form.classList.add('error');
    } else {
        form.classList.remove('error');
        document.body.innerHTML = 'Thank you!';
    }
})

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}