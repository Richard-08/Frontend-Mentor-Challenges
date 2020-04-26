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

/* Render list item */

function renderListItem(urlValue, shortenedURL) {
    const html = `
    <div class="shortener-list__item">
        <span class="link">${urlValue}</span>

    <div class="shortened-url">
      <span class="short-link">${shortenedURL}</span>
      <button class="copy-btn btn" data-target="copy">Copy</button>
    </div>
  </div>`;

    listOfLinks.insertAdjacentHTML('afterbegin', html);
}

/* Render list of links */

function renderListOfLinks(linksArr = [], linksList) {
    return linksArr.map(link => {
        const html = `
        <div class="shortener-list__item">
            <span class="link">${link.urlValue}</span>

        <div class="shortened-url">
          <span class="short-link">${link.shortenedURL}</span>
          <button class="copy-btn btn" data-target="copy">Copy</button>
        </div>
      </div>`

        linksList.insertAdjacentHTML('afterbegin', html)

    });
}

renderListOfLinks(links, listOfLinks);

/* url shortener  */

async function shortenUrl(url) {

    const response = await fetch('https://rel.ink/api/links/', {
        method: 'POST',
        body: JSON.stringify({ url }),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    });

    const result = await response.json();
    const shortenedUrl = `https://rel.ink/${result.hashid}`;

    addLinkInStorage(url, shortenedUrl);
    renderListItem(url, shortenedUrl);
}

/* Listeners */

form.addEventListener('submit', event => {
    event.preventDefault();

    const urlValue = url.value;

    if (!validateUrl(urlValue)) {
        url.value = '';
        form.classList.add('error');
    } else {
        form.classList.remove('error');
        shortenUrl(urlValue);
        url.value = '';
    }
});

url.addEventListener('input', event => {
    event.preventDefault();

    form.classList.remove('error');
})

/* Validate URL */

function validateUrl(url) {
    const urlRegexp = /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/?|(\/[\w.?#$%&=-]+\/?)*)$/;
    return urlRegexp.test(url);
}

/* Copy link */

function copyLink(link) {

    const range = document.createRange();
    const selection = document.getSelection();

    range.selectNodeContents(link);
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');
    selection.removeAllRanges();
}

function copiedBtn(btn) {
    btn.innerText = 'Copied!';
    btn.classList.add('copied');
}

/* Listener */

listOfLinks.addEventListener('click', event => {
    event.preventDefault();

    if (event.target.dataset.target) {
        const element = event.target;
        const node = event.target.parentNode.querySelector('.short-link');

        copyLink(node);
        copiedBtn(element);
    }
})