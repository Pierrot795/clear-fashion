const dedicatedbrand = require('./sources/dedicatedbrand');
const loom = require('./sources/loom');
const adress = require('./sources/adressebrand')
const {close,insertion,querydata} = require('./db');


//shuffle the array to not have 3 successive blocs of products with the same brand 
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

async function sandbox () {
    try {
      let products = [];
      let pages = [
        'https://www.dedicatedbrand.com/en/men/basics',
        'https://www.dedicatedbrand.com/en/men/sale'
      ];
  
      console.log(`🕵️‍♀️  browsing ${pages.length} pages with for...of`);
  
      // Way 1 with for of: we scrape page by page
      for (let page of pages) {
        console.log(`🕵️‍♀️  scraping ${page}`);
  
        let results = await dedicatedbrand.scrape(page);
  
        console.log(`👕 ${results.length} products found`);
  
        products.push(results);
      }

      adressepage = 'https://adresse.paris/630-toute-la-collection'
      let adress_results = await adress.scrape(adressepage)
      products.push(adress_results)

  
      pages = [
        'https://www.loom.fr/collections/hauts',
        'https://www.loom.fr/collections/bas'
      ];
  
      console.log('\n');
  
      console.log(`🕵️‍♀️  browsing ${pages.length} pages with Promise.all`);
  
      const promises = pages.map(page => loom.scrape(page));
      const results = await Promise.all(promises);
  
      console.log(`👕 ${results.length} results of promises found`);
      console.log(`👕 ${results.flat().length} products found`);
  
      console.log(results);
      console.log(results.flat());
  
      products.push(results.flat());
      products = products.flat();

      products.forEach(element => {
        element["date"] = getRandomDate(new Date(2020,11,10),new Date(2021,03,02));
        
      });

      console.log("YES"+products[1].date)
  
      console.log('\n');
  
      console.log(`👕 ${products.length} total of products found`);
  
      console.log('\n');

      let shuffled_prod = shuffle(products);
  
      const result = await insertion(shuffled_prod);
  
      console.log(`💽  ${result.insertedCount} inserted products`);
  
      console.log('\n');
  
      console.log('💽  Find Loom products only');
  
      const loomOnly = await querydata({'brand': 'loom'});
  
      console.log(`👕 ${loomOnly.length} total of products found for Loom`);
      console.log(loomOnly);
  
      close();
    } catch (e) {
      console.error(e);
    }
  }

  //define a random past date (we couldn't retrieve the real addition dates of the products).
  function getRandomDate(from,to) {
    from = from.getTime();
    to = to.getTime();
    return new Date(from+ Math.random() * (to - from));
}
  sandbox();