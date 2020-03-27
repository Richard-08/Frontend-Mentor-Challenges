const form = document.querySelector('.form');
const firstName = document.querySelector('.firstname');
const lastName = document.querySelector('.lastname');
const email = document.querySelector('.email');
const password = document.querySelector('.password');

form.addEventListener('submit', event => {
    event.preventDefault();

    checkInputs();
});

function checkInputs() {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (firstNameValue === '') {
        setErrorFor(firstName);
    } else {
        setSuccessFor(firstName);
    }

    if (lastNameValue === '') {
        setErrorFor(lastName);
    } else {
        setSuccessFor(lastName);
    }

    if (emailValue === '') {
        setErrorFor(email);
    } else if (!isEmail(emailValue)) {
        setErrorFor(email);
    } else {
        setSuccessFor(email);
    }

    if (passwordValue === '') {
        setErrorFor(password);
    } else {
        setSuccessFor(password);
    }
}

function setErrorFor(input) {
    const formControl = input.parentElement;
    formControl.classList.add('error');
    formControl.classList.remove('success');
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.classList.add('success');
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}