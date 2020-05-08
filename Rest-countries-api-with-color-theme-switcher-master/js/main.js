/* ------------------------------------------------------Dark/Light Mode-------------------------------------------------- */

const modeToggle = document.querySelector('.header__mode');

function toggleMode() {
    document.body.classList.toggle('light');
}

modeToggle.addEventListener('click', event => {
    toggleMode();
})

/* ------------------------------------------------------REST Countries-------------------------------------------------- */

/* ==========Render data============ */

const toHTML = country => `
<div class="country" data-name="${country.name}">
    <div class="country__flag">
        <img src="${country.flag}" alt="">
    </div>
    <div class="country__info">
        <h3 class="country__name">${country.name}</h3>
        <p>Population: <span class="country__population">${country.population}</span></p>
        <p>Region: <span class="country__region">${country.region}</span></p>
        <p>Capital: <span class="country__capital">${country.capital}</span></p>
    </div>
</div>`;

function render(data) {
    const html = data.map(toHTML).join('');
    document.querySelector('.countries-box').innerHTML = html;
}

/* ==========Get countries data======= */

async function getCountriesData() {
    const countriesData = [];

    let response = await fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then(data => countriesData.push(...data));

    render(countriesData);
}

getCountriesData();

/* ==================Search by region================== */

async function getCountriesByRegion(region) {
    const countriesData = [];

    let response = await fetch(`https://restcountries.eu/rest/v2/region/${region.toLowerCase()}`)
        .then(response => response.json())
        .then(data => countriesData.push(...data));
    render(countriesData);
}

/* ---------------------------------------------------------Filter------------------------------------------------------- */

const dropdown = document.querySelector('.dropdown-filter');
const filters = document.querySelector('.filters');

function showFilters() {
    filters.classList.toggle('show');
}

dropdown.addEventListener('click', event => {
    event.preventDefault();

    if (event.target.dataset.open) {
        showFilters();
    } else if (event.target.dataset.filter) {
        getCountriesByRegion(event.target.textContent);
        showFilters();
    }
});



/* ---------------------------------------------------------Search by country name------------------------------------------------------- */

const searchField = document.querySelector('.form__search');
const form = document.querySelector('.form');

/* ==================Search by name================== */

async function getCountriesByName(name) {
    const countriesData = [];

    let response = await fetch(`https://restcountries.eu/rest/v2/name/${name.toLowerCase()}`)
        .then(response => response.json())
        .then(data => countriesData.push(...data));
    render(countriesData);
}

form.addEventListener('submit', event => {
    event.preventDefault();

    const name = searchField.value;
    getCountriesByName(name);
});


/* ---------------------------------------------------------Country details modal------------------------------------------------------- */

const toHTMLdetails = country => `
<div class="container">

    <div class="country-detail">
        <button class="back btn" data-close="close"><i class="fas fa-arrow-left"></i> Back</button>

        <div class="details">
            <div class="details__img">
                <img src="${country.flag}" alt="">
            </div>

            <div class="details__text">
                <h2>${country.name}</h2>

                <ul class="details__list">
                    <li>Native Name: <span>${country.nativeName}</span></li>
                    <li>Population: <span>${country.population}</span></li>
                    <li>Region: <span>${country.region}</span></li>
                    <li>Sub Region: <span>${country.subregion}</span></li>
                    <li>Capital: <span>${country.capital}</span></li>
                    <li>Top Level Domain: <span>${country.topLevelDomain.length > 1 ? country.topLevelDomain.join(', ') : country.topLevelDomain.join('')}</span></li>
                    <li>Currencies: <span>${getDataFromArray(country.currencies)}</span></li>
                    <li>Languages: <span>${getDataFromArray(country.languages)}</span></li>
                </ul>

                <div class="border-countries">
                    <span>Border Countries: </span>
                    ${getCountryBorders(country.borders)}
                </div>
            </div>
        </div>
    </div>

</div>`;

/* -----Get Country Languages----- */

function getDataFromArray(arr) {
    const data = [];
    arr.forEach(element => {
        data.push(element.name);
    });

    return data.join(', ');
}

/* -------------------Get Country Borders--------------------- */

function getCountryBorders(arr) {
    return arr.map(item => `<button class="border-countries__btn btn" data-border="${item}">${item}</button>`)
        .join('');
}

/* --------------------Render Country Details----------------- */

function renderCountryDetails(data) {
    const html = data.map(toHTMLdetails).join('');
    document.querySelector('.details-modal').innerHTML = html;
}

/*  ---------------------Get Country Details API---------------------------- */

async function getCountryDetail(name, search) {
    const countryData = [];

    let response = await fetch(`https://restcountries.eu/rest/v2/${search}/${name.toLowerCase()}`)
        .then(response => response.json())
        .then(data => Array.isArray(data) ? countryData.push(...data) : countryData.push(data));

    console.log(countryData);

    renderCountryDetails(countryData);
}


/* Listeners */

const countries = document.querySelector('.countries-box');

/* -------------------Show country details modal-------------------- */

function showModal() {
    document.querySelector('.details-modal').classList.toggle('show');
    countries.classList.toggle('lock');
}

countries.addEventListener('click', event => {
    let key = event.target;
    while (!key.dataset.name) {
        key = key.parentNode;
    }
    getCountryDetail(key.dataset.name, 'name');
    scroll(0, 0);
    showModal();
});


/* ---------------------------------------------------------Country details modal actions------------------------------------------------------- */

const modal = document.querySelector('.details-modal');


modal.addEventListener('click', event => {
    event.preventDefault();

    if (event.target.dataset.close) {     // Close country details modal
        modal.innerHTML = "";
        showModal();

    } else if (event.target.dataset.border) {    // Open border country details modal
        getCountryDetail(event.target.dataset.border, 'alpha');
    }
});