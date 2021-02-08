const axios = require('axios'); 
const cheerio = require('cheerio');

const parse = data => {
    const $ = cheerio.load(data); 
    return $('.right-block') //demander de recup ensemble des elements du dom pointant sur ce selecteur
    .map((i, element) => { //donc les produits sur la page qu'on scrape. On les parcourt un à un grace à map
      const name = $(element) //sur l'element/produit courant, applique les fonctions suivantes pour avoir le nom du produit
        .find('.product-name')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt( 
        $(element)
          .find('.price product-price')
          .text()
      );
        return {name, price}; 
      })
      .get(); 
  };

module.exports.scrape = async url => { 
  const response = await axios(url);
  const {data, status} = response; 

  if (status >= 200 && status < 300) { 
    return parse(data);
  }

  console.error(status);

  return null;
};