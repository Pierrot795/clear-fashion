Here is the link of my version of Clear Fashion : https://clientfashionclient.vercel.app/

Organisation of this repository:

In the client side you will find:
- index.html: entry point of the website, describing what will be printed to your screen. It calls two files: portfolio.js and style.css.

- style.css: defines the visual appearance of the different HTML elements (size, color, background,positioning...)

- portfolio.js: Permits to call our API to get products and define how they will be rendered in the HTML page. Functionalities to manipulate the products,sort 
them by price and date, and filter them by products have been added. Here JavaScript permit us to manipulate dynamic data into the HTML page.


In the server side you will find:
-a source folder where we have adressebrand.js,dedicatedbrand.js and loom.js.
In each of these file is defined a way to scrap products from a particular brand website.
Axios permits to make http requests on an URL to be able to than parse the data from the corresponding page using Cheerio.
For each product we find and store its URL, brand,price,name and the URL of one of its photos.

-a db folder where we have an index.js. In this file we use the MongoDB Node.js driver to define a connection to MongoDB Atlas.
Here are defined the functions to connect to our database, but also to insert data in a collection and query data.

-a sandbox-db.js file where products from dedicated,adresseparis and loom are scraped, using the methods defined in the "sources" files.
All these products are then inserted into a MongoDB collection after having been shuffled, to be able to have products of different brands on the same pages on the
front-end.
We also add to them a random past date to be able to sort products by date.
The collection have been created just by calling "node sandbox-db.js" in the client part.

-an api.js file where we create a REST API with Express which will permit to access to the products stored in MongoDB,
and make them processible in portfolio.js where the API is called.
Here is the url pattern of the API: https://clearfashion.vercel.app/products?page=${page}&size=${size}.
At each call, products will be split into pages, and the number of products in a page will be defined by size.
For example if page = 2 and size = 12, we will have displayed the products from the 12th to the 24th in the database.

-a vercel.json file to make our endpoint working with vercel.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# 👕 Clear Fashion

> What's the story behind each item of clothing you buy?

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [📱 Context](#-context)
- [🤔 Problems](#-problems)
- [🎯 Objective](#-objective)
- [🛣 How to solve it?](#%F0%9F%9B%A3-how-to-solve-it)
- [👩🏽‍💻 Step by step with Workshops](#%E2%80%8D-step-by-step-with-workshops)
- [🌱 Source and Inspiration](#-source-and-inspiration)
- [📝 Licence](#-licence)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 📱 Context

[Clear Fashion](https://www.clear-fashion.com/) is an iOS and Android application that allows you **to choose environmentally & human-friendly clothes**.

With Clear Fashion, you will get an analysis **with transparency and independency** of the commitments of brands according to 4 themes: Human, Health, Environment & Animals.


<img src="./docs/zara.png" width="45%"/> <img src="./docs/uniqlo.png" width="45%"/>

<img src="./docs/decathlon.png" width="45%"/> <img src="./docs/ask.png" width="45%"/>

<img src="./docs/top.png" width="45%"/> <img src="./docs/mud.png" width="45%"/>

## 🤔 Problems

Clear Fashion is particularly committed to ensuring that there are **no conflicts due to commercial interests**.

The problems as consumer are

1. **I cannot open my favorite brands shop links**
1. **I cannot consult on the same page all the products of my favorite brands**

I have to search on google the e-shop link for all brands.

![Google](./docs/google.jpg)

I have to browse each e-shop brand to look for a product.

![Shops](./docs/shops.jpg)

## 🎯 Objective

**Build a web application to list my favorite top responsible brands Products.**

## 🛣 How to solve it?

1. 👖 **Manipulate Products**: How to [manipulate](https://github.com/92bondstreet/javascript-empire/blob/master/themes/1.md#about-javascript) the products in the [browser](https://github.com/92bondstreet/javascript-empire/blob/master/themes/1.md#about-htmlcss)
2. 🧹 **Scrape Products**: How to [fetch](https://github.com/92bondstreet/javascript-empire/blob/master/themes/2.md#about-nodejs) Products from different website sources
3. 📱 **Render Products in the browser**: How to [interact](https://github.com/92bondstreet/javascript-empire/blob/master/themes/2.md#about-react) with the Products in the browser
4. 💽 **Save Products in database**: How to avoid to scrape again and again the same data
5. ⤵️ **Request Products with an api**: How to [give access](https://github.com/92bondstreet/javascript-empire/blob/master/themes/3.md#about-restful-and-graphql-api) to your data
6. 🐛 **Test your code**: How to [ensure quality](https://github.com/92bondstreet/javascript-empire/blob/master/themes/3.md#about-test-driven-development) and confidence
7. 🚀 **Deploy in production**: How to [give access](https://github.com/92bondstreet/javascript-empire/blob/master/themes/3.md#about-serverless) to anyone

## 👩🏽‍💻 Step by step with Workshops

![Maps](./docs/map.jpg)


With [javascript-empire](https://github.com/92bondstreet/javascript-empire/tree/master/themes) themes, we'll follow next workshops to solve our problem:

| Step | Workshops | Planned Date
| --- | --- | ---
| 1 | [Manipulate data with JavaScript in the browser](./workshops/1-manipulate-javascript.md) | 18th January 2021
| 2 | [Interact data with JavaScript, HTML and CSS in the browser again](./workshops/2-interact-js-css.md) | 25th and 26th January 2021
| 3 | [Scrape data with Node.js](./workshops/3-scrape-node.md) | 1st and 8th February 2021
| 4 | [Save data in a Database with MongoDB](./workshops/4-store-mongodb.md) | 1st March 2021
| 5 | Build an api with Express to request data | 8th March 2021
| 6 | Test your code with Jest | 15th March 2021
| 7 | Deploy in production with Vercel | 22th March 2021
| 8 | Render data with React | April extra mile.


## 🌱 Source and Inspiration

* [Clear Fashion](https://www.clear-fashion.com/)

## 📝 Licence

[Uncopyrighted](http://zenhabits.net/uncopyright/)
