// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};
let sort;
let brands = [];

// inititiqte selectors
const selectShow = document.querySelector('#show-select'); //des que changement, change le nb de produits affichés sur la page
const selectPage = document.querySelector('#page-select'); //document pointe sur index.html
const selectSort = document.querySelector('#sort-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectBrands = document.querySelector('#brand-select');
/**
 * Set global value
 * @param {Array} result - products to display //param permits to describe a parameter which will be used in a function. like an assertion to a type for example
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => { //params:la data du body de l'api => les stocke dans des tableaux
  currentProducts = result; //a chaque appel de l'api je viens stocker les produits ici
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch asserted to 1
 * @param  {Number}  [size=12] - size of the page
 * @return {Object} //type of return for the following function
 */
const fetchProducts = async (page = 1, size = 12) => { //appel d'API
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json(); //decode la reponse pour avoir un objet JSON

    if (body.success !== true) { //si le decodage a pas marché 
      console.error(body);
      return {currentProducts, currentPagination};
    }
    return body.data; //contient meta et results
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => { //affichage de tous les produits
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

const renderBrands = products => {
  products.forEach(function(product){
    if(brands.includes(product.brand) == false){
      brands.push(product.brand);
    }
    });
  };


/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
};

const render = (products, pagination) => {
  renderProducts(products);
  sorting();
  renderPagination(pagination);
  renderIndicators(pagination);
};


const sortbypriceasc = (currentProducts) => {
  currentProducts.sort(function(a,b){
    {return a.price - b.price}
  });
};
const sortbypricedesc = (currentProducts) => {
  currentProducts.sort(function(a,b){
    {return b.price - a.price}
  });
};

const sortbydateasc = (currentProducts) =>  {
  currentProducts.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  });
}

const sortbydatedesc = (currentProducts) =>  {
  currentProducts.sort(function(a,b){
    return new Date(a.date) - new Date(b.date);
  });
}
const sorting = (sort) => {
  switch(sort){
    case "price-asc":
      sortbypriceasc(currentProducts);
      break;
    case "price-desc":
      sortbypricedesc(currentProducts);
      break;
    
    case "date-asc":
      sortbydateasc(currentProducts);
      break;

    case "date-desc":
      sortbydatedesc(currentProducts);
      break;
  }

};
/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */
selectShow.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value)) //la page demandée à l'api n'est pas forcément 1, et la size depend de l'event
    .then(setCurrentProducts) //quand fetchproducts a terminé: on appelle setcurrentproducts
    .then(() => render(currentProducts, currentPagination));
});

selectPage.addEventListener('change',event => {
  fetchProducts(parseInt(event.target.value),selectShow.value)
  .then(setCurrentProducts)
  .then(() => render(currentProducts,currentPagination));
}); 

selectSort.addEventListener('change', event => {
 sort = event.target.value;
 sorting(sort);
 render(currentProducts,currentPagination);
});

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts() //retourne infos de l'api, result et meta
    .then(setCurrentProducts) //quand fetchproducts a terminé: on appelle setcurrentproducts
    .then(() => render(currentProducts, currentPagination)) //une fois setcurrentproducts appellée, j'appelle render
);
