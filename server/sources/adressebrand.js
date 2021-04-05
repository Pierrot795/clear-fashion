const axios = require('axios'); 
const cheerio = require('cheerio');

const parse = data => {
    const $ = cheerio.load(data); 
    return $('.product-container') //demander de recup ensemble des elements du dom pointant sur ce selecteur
    .map((i, element) => { //donc les produits sur la page qu'on scrape. On les parcourt un à un grace à map
      const name = $(element) //sur l'element/produit courant, applique les fonctions suivantes pour avoir le nom du produit
        .find('.product-name')
        .attr('title')
      const price = parseInt( 
        $(element)
          .find('.price')
          .text()
      );
      const photo = $(element)
        .find('img')
        .attr('data-original')
      const link = $(element)
        .find('.product-name')
        .attr('href')
      const brand = "adresse"
        return {link, brand,price,name,photo}; 
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