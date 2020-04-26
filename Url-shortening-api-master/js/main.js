/** 
 * * -------------------------------Humburger Menu---------------------------------
*/

const burger = document.querySelector('.nav__burger');
const menu = document.querySelector('.nav__content');

function showMenu() {
    menu.classList.toggle('show');
    burger.classList.toggle('active');
}

burger.addEventListener('click', () => {
    showMenu();
});

/** 
 * * -------------------------------URL Shortener---------------------------------
*/

/* Elements */
const url = document.querySelector('.url');
const form = document.querySelector('.form');
const listOfLinks = document.querySelector('.shortener-list');

let links = JSON.parse(localStorage.getItem('links')) || [];

/* Add link in localstorege */

function addLinkInStorage(urlValue, shortenedURL) {
    const link = { urlValue, shortenedURL };

    links.push(link);
    localStorage.setItem('links', JSON.stringify(links));
}

/* Render list of links */

function render(linksArr = [], linksList) {
    linksList.innerHTML = linksArr.map(link => {
        return `
        <div class="shortener-list__item">
            <span class="link">${link.urlValue}</span>

        <div class="shortened-url">
          <span class="short-link">${link.shortenedURL}</span>
          <button class="copy-btn btn" data-target="copy">Copy</button>
        </div>
      </div>`
    }).join('');
}

/* url shortener  */

async function shortenUrl(url) {
    /* const urlValue = url.value; */
    try {
        const response = await fetch('https://rel.ink/api/links/', {
            method: 'POST',
            url: url
        });
        console.log('get');

        const result = await response.json();
        const shortenedUrl = `https://rel.ink/${result.hashid}`;

        addLinkInStorage(urlValue, shortenedUrl);

    } catch (error) {
        console.error(error);
    }
}