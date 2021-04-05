
const dedicatedbrand = require('./sources/dedicatedbrand'); 
const adressebrand = require('./sources/adressebrand');
const mudjeans= require('./sources/mudjeansbrand');

const cheerio = require('cheerio');


async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men/basics',brand) { 
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`); 

    const products = await brand.scrape(eshop); 
    console.log(products);

    return products

  } catch (e) {
    console.log("error");
    console.error(e);
  }

}






const [,, eshop] = process.argv;

sandbox('https://adresse.paris/630-toute-la-collection',adressebrand)



