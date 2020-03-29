const form = document.querySelector('.form');
const email = document.querySelector('.email');

form.addEventListener('submit', event => {
    event.preventDefault();

    const emailValue = email.value;

    /* Check if it is a valid email */
    if (!isEmail(emailValue)) {
        form.classList.add('error');
        form.classList.remove('success');
    } else {
        form.classList.remove('error');
        form.classList.add('success');
    }
});


function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}