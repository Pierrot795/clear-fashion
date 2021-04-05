const axios = require('axios'); //module de dependances (dans package.json = module exterieur)
//client http: permet de faire des requetes http et d'exploiter les resultats
const cheerio = require('cheerio');
//fait pour serveur, basé sur jquery. Fournit une api/librairie pour parcourir et manipuler des données
//interprete du code html mais coté serveur (normalement que le navigateur peut) et permet de le manipuler
const {'v5': uuidv5} = require('uuid');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
 const parse = data => {
  const $ = cheerio.load(data);

  return $('.productList-container .productList')
    .map((i, element) => {
      const link = `https://www.dedicatedbrand.com${$(element)
        .find('.productList-link')
        .attr('href')}`;

      return {
        link,
        'brand': 'dedicated',
        'price': parseInt(
          $(element)
            .find('.productList-price')
            .text()
        ),
        'name': $(element)
          .find('.productList-title')
          .text()
          .trim()
          .replace(/\s/g, ' '),
        'photo': $(element)
          .find('.productList-image img')
          .attr('src'),
        '_id': uuidv5(link, uuidv5.URL)
      };
    })
    .get();
};


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
module.exports.scrape = async url => { 
  const response = await axios(url);
  const {data, status} = response; 
//

  if (status >= 200 && status < 300) { 
    return parse(data);
  }

  console.error(status);

  return null;
};

module.exports.scrapecategories = async url => { 
  const response = await axios(url);
  const {data, status} = response; 

  if (status >= 200 && status < 300) { 
    return parsecategories(data);
  }

  console.error(status);

  return null;
};
