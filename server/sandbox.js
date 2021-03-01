/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand'); //stocke le resultat de ce qu'il y a dans dedicatedbrand.js
const adressebrand = require('./sources/adressebrand');
const mudjeans= require('./sources/mudjeansbrand');

const cheerio = require('cheerio');


async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men',brand) { //cet url là par defaut <=> page scrapée par defaut
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`); //s'affiche dans le serveur node

    const products = await brand.scrape(eshop); //stocke le resultat du scraping sur la page definie par le lien
    //dedicatedbrand est un module, et scrape une de ses fonctions
    console.log(products);
    console.log('done');
  } catch (e) {
    console.log("error");
    console.error(e);
  }
}



async function retrieveurls(eshop = 'https://www.dedicatedbrand.com/en/'){
  try {

    const urls = await dedicatedbrand.scrapecategories(eshop); //stocke le resultat du scraping sur la page definie par le lien
    //dedicatedbrand est un module, et scrape une de ses fonctions
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
sandbox('https://adresse.paris/630-toute-la-collection?id_category=630&n=109',adressebrand);

