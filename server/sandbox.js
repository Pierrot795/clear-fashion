
const dedicatedbrand = require('./sources/dedicatedbrand'); 
const adressebrand = require('./sources/adressebrand');
const mudjeans= require('./sources/mudjeansbrand');

const cheerio = require('cheerio');


async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men',brand) { 
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`); 

    const products = await brand.scrape(eshop); 

    return products

  } catch (e) {
    console.log("error");
    console.error(e);
  }

}



async function retrieveurls(eshop = 'https://www.dedicatedbrand.com/en/'){
  try {

    const urls = await dedicatedbrand.scrapecategories(eshop); 

    urls.forEach(function(url){
      sandbox(url);
    })

  } catch (e) {
    console.error(e);
  }
}

async function mudjeansprod(eshop = 'https://mudjeans.eu/'){
  try {

    const urls = await adressebrand.scrapecategories(eshop); //stocke le resultat du scraping sur la page definie par le lien
    //dedicatedbrand est un module, et scrape une de ses fonctions
    urls.forEach(function(url){
      sandbox(url);
    })

  } catch (e) {
    console.error(e);
  }
}

const [,, eshop] = process.argv;
//retrieveurls();
//sandbox(eshop);
module.exports = {sandbox,retrieveurls};


