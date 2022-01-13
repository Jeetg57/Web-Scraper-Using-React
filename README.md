# Getting Started with the Web Scraper App

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs the neccessary libraries for the application to run

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## How it works

This app makes use of the following libraries

1. [Cheerio](https://www.npmjs.com/package/cheerio)
2. [Axios](https://www.npmjs.com/package/axios)
3. [React-bootstrap](https://www.npmjs.com/package/react-bootstrap)
4. [Bootstrap](https://www.npmjs.com/package/bootstrap)

The app first gets the html from the page, then performs a couple of regular expressions such as `/(<script\b[^>]*>([\s\S]*?)<\/script>)/gim` to eliminate the unneccessary information such as scripts, and html tags and classes. Next, we make a dictionary of the unique words and their counts. We then use recursive search to find the Difference and Intersection between two pages provided by the user

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> </p>
