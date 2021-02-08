const axios = require('axios'); //module de dependances (dans package.json = module exterieur)
//client http: permet de faire des requetes http et d'exploiter les resultats
const cheerio = require('cheerio');
//fait pour serveur, basé sur jquery. Fournit une api/librairie pour parcourir et manipuler des données
//interprete du code html mais coté serveur (normalement que le navigateur peut) et permet de le manipuler

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data); // on donne le html pour qu'il puisse etre manipulé par nodejs

  return $('.productList-container .productList') //demander de recup ensemble des elements du dom pointant sur ce selecteur
    .map((i, element) => { //donc les produits sur la page qu'on scrape. On les parcourt un à un grace à map
      const name = $(element) //sur l'element/produit courant, applique les fonctions suivantes pour avoir le nom du produit
        .find('.productList-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt( //meme principe pour le prix
        $(element)
          .find('.productList-price')
          .text()
      );

      return {name, price}; //on retourne le prix et le nom en un objet à 2 clés
    })
    .get(); //transforme la liste wrappée en collection cheerio creee par .map en array
};
//$ permet de pointer vers des éléments dans l'html en les passant en parametre

function parsecategories (data) {
  let urls_cat = [];
  const $ = cheerio.load(data);
  $('.mainNavigation-link-subMenu-link a').each((i,el) => {
    const item = $(el).attr('href');
    urls_cat.push('https://www.dedicatedbrand.com'+item);
  })
  return urls_cat;
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => { //j'importe la fonction scrape a l'exterieur, donc dans sandbox.js, recup par le require
  const response = await axios(url);
  const {data, status} = response; //on recup deux clés à partir de la reponse
//
//data est le html de la page qu'on veut scraper (en general c'est la data renvouéee par l'api)
  if (status >= 200 && status < 300) { //codes http
    return parse(data);
  }

  console.error(status);

  return null;
};

module.exports.scrapecategories = async url => { //j'importe la fonction scrape a l'exterieur, donc dans sandbox.js, recup par le require
  const response = await axios(url);
  const {data, status} = response; //on recup deux clés à partir de la reponse
//
//data est le html de la page qu'on veut scraper (en general c'est la data renvouéee par l'api)
  if (status >= 200 && status < 300) { //codes http
    return parsecategories(data);
  }

  console.error(status);

  return null;
};
