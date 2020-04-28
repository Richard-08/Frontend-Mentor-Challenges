/** 
 * * -------------------------------Humburger Menu---------------------------------
*/

const burger = document.querySelector('.nav__burger');
const menu = document.querySelector('.nav__items');
const nav = document.querySelector('.nav');

function showMenu() {
    menu.classList.toggle('show');
    burger.classList.toggle('open');
    nav.classList.toggle('show');
    document.body.classList.toggle('lock');
}

burger.addEventListener('click', () => {
    showMenu();
});


/** 
 * * ==================================Tabs Content=======================================
*/

const tabItems = document.querySelectorAll('.tab-item');
const tabContentItems = document.querySelectorAll('.tab-content-item');


function selectItem(e) {
    removeBorder();
    removeShow()
    this.classList.add('active');
    /* console.log(this.dataset.id); */

    const tabContentItem = document.querySelector(`.tab-${this.dataset.id}-content`);
    tabContentItem.classList.add('active');
}

function removeBorder() {
    tabItems.forEach(item => item.classList.remove('active'));
}

function removeShow() {
    tabContentItems.forEach(item => item.classList.remove('active'));
}

tabItems.forEach(item => item.addEventListener('click', selectItem));


/** 
 * * ==================================FAQ=======================================
*/

const titles = document.querySelectorAll('.FAQ-box__title');
const texts = document.querySelectorAll('.FAQ-box__text');

function hideAllTexts() {
    for (let i = 0; i < texts.length; i += 1) {
        titles[i].classList.remove('active');
        texts[i].classList.remove('active');
    }

}

for (let title of titles) {
    title.addEventListener('click', function () {

        if (!this.classList.contains('active')) {
            hideAllTexts();
        }

        title.classList.toggle('active');
        title.nextElementSibling.classList.toggle('active');
    });
}

/** 
 * * ==================================Form Validation=======================================
*/

const form = document.querySelector('.form');
const email = document.querySelector('.email');

email.addEventListener('input', event => {
    event.preventDefault();
    form.classList.remove('error');
    email.placeholder = 'Updates in your inbox…';
});

form.addEventListener('submit', e => {
    e.preventDefault();

    const emailValue = email.value;

    /* Check if it is a valid email */
    if (!isEmail(emailValue)) {
        form.classList.add('error');
        email.placeholder = 'example@email/com';
        email.value = '';
    } else {
        form.classList.remove('error');
        email.placeholder = 'Updates in your inbox…';
    }
});

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}