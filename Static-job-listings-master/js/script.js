/* ////////////////////// Elements ///////////////////// */

const jobListing = document.querySelector('.job-listing');
const filterList = document.querySelector('.filter-list');
const clearBtn = document.querySelector('.clear-btn');
let filters = [];


/* //////////////////////////////// Render data //////////////////////////// */

function toHTML(data) {
  return `
    <div class="vacancy ${data.featured ? 'top' : ''}">

    <div class="main-content">
      <div class="logo">
        <img src="${data.logo}" alt="${data.company}">
      </div>

      <div class="main-content__text">
        <div class="company">
          <h4 class="company__name">${data.company}</h4>
          <span class="tag new ${data.new}">New!</span>
          <span class="tag featured ${data.featured}">Featured</span>
        </div>

        <div class="role">
          <h3>${data.position}</h3>
        </div>

        <div class="about-job">
          <span>${data.postedAt}</span>
          <span>${data.contract}</span>
          <span>${data.location}</span>
        </div>
      </div>
    </div>

    <div class="categories">
      <div class="filter" data-role="${data.role}">${data.role}</div>
      <div class="filter" data-level="${data.level}">${data.level}</div>
      ${dataLanguagesToHTML(data.languages)}
      ${dataToolsToHTML(data.tools)}
    </div>

    </div>`
}

function dataLanguagesToHTML(arr) {
  if (!arr) {
    return '';
  }

  const html = arr.map(lang => `<div class="filter" data-languages="${lang}">${lang}</div>`).join('');
  return html;
}

function dataToolsToHTML(arr) {
  if (!arr) {
    return '';
  }

  return arr.map(tool => `<div class="filter" data-tools="${tool}">${tool}</div>`).join('');
}


/* Render */

function render(data) {
  const html = data.map(toHTML).join('');
  document.querySelector('.job-listing').innerHTML = html;
}

render(dataObj);


/* /////////////////////////////////// Add Filter ////////////////////////////////////// */

function addFilter(filter) {
  document.querySelector('.filter-field').classList.add('active');
  const html = `
    <div class="filters">
        <div class="filter__name">${filter}</div>
        <div class="remove-btn"><img src="images/icon-remove.svg" alt="remove" data-remove="remove"></div>
    </div>`;
  filterList.insertAdjacentHTML('beforeend', html);
}


/* ////////////////////////////// Filter Listing /////////////////////////////////// */

/* function filterListing(arrFilters, arrData) {
  const newData = arrData.filter(value => {
    let arrValues = Object.values(value).flat();
    return arrFilters.every(item => arrValues.includes(item));
  });

  render(newData);
} */

function filterListing(arrFilters, arrData) {
  const newData = arrData.filter(value => {
    let arrFilterValues = [value.role, value.level, ...value.languages || [], ...value.tools || []];
    return arrFilters.every(item => arrFilterValues.includes(item));
  })

  render(newData);
}


/* ////////////////////// Remove filter from Filter List //////////////////////////// */


function removeFilter(elem, filterName) {

  filters = filters.filter(value => value !== filterName);

  filterList.removeChild(elem);

  if (filters.length <= 0) {
    document.querySelector('.filter-field').classList.remove('active');
    render(dataObj);
  } else {
    filterListing(filters, dataObj);
  }

}


/* ////////////////////////////// Listeners ////////////////////////// */

jobListing.addEventListener('click', event => {
  event.preventDefault();

  if (event.target.dataset.role || event.target.dataset.level || event.target.dataset.languages || event.target.dataset.tools) {

    if (!filters.includes(event.target.textContent)) {
      addFilter(event.target.textContent);
      filters.push(event.target.textContent);
      filterListing(filters, dataObj);
    }
  }
});

/* //////// Clear Button Listener ////////////////// */

clearBtn.addEventListener('click', event => {
  event.preventDefault();

  filters.length = 0;
  document.querySelector('.filter-field').classList.remove('active');
  filterList.innerHTML = '';
  render(dataObj);
});


/* //////// Filters List Listener ////////////////// */


filterList.addEventListener('click', event => {
  event.preventDefault();

  if (event.target.dataset.remove) {
    let node = event.target.parentNode.parentNode;
    let removeFilterName = node.querySelector('.filter__name').textContent;

    removeFilter(node, removeFilterName);
  }
});