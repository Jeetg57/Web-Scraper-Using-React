const cheerio = require("cheerio");
const axios = require("axios"); //15k (gzipped: 5.1k)
export const getWordDictionary = (url) => {
  const response = axios
    .get(url, { withCredentials: false })
    .then((res) => {
      let status = res.status;
      if (status === 200) {
        const $ = cheerio.load(res.data);
        const scriptRegex = /(<script\b[^>]*>([\s\S]*?)<\/script>)/gim;
        const htmlRegex = /(<(“[^”]*”|'[^’]*’|[^'”>])*>)/gim;
        let text = $.html();
        let removeHtml = text
          .toLowerCase()
          .replace(scriptRegex, "")
          .replace(htmlRegex, "");
        let getWords = removeHtml.match(/[a-zA-Z]+/g).sort();
        let words = getWords.length;
        let dict = {};
        getWords.forEach((word) =>
          dict[word] >= 1 ? (dict[word] += 1) : (dict[word] = 1)
        );
        let count = 0;
        for (const k in dict) if (dict.hasOwnProperty(k)) ++count;
        return {
          dictionary: dict,
          length: count,
          totalwords: words,
        };
      }
    })
    .catch((err) => console.error(err));
  return response;
};

export const recursiveSearch = function (arr, x, start, end) {
  if (start > end) return false;
  let mid = Math.floor((start + end) / 2);
  if (arr[mid] === x) return true;
  if (arr[mid] > x) return recursiveSearch(arr, x, start, mid - 1);
  else return recursiveSearch(arr, x, mid + 1, end);
};

export function intersection(dict1, dict2) {
  const wordsDict1 = Object.keys(dict1.dictionary);
  const wordsDict2 = Object.keys(dict2.dictionary);
  let intersect = [];
  for (let i = 0; i < wordsDict1.length; i++) {
    if (recursiveSearch(wordsDict2, wordsDict1[i], 0, wordsDict2.length - 1)) {
      intersect.push(wordsDict1[i]);
    }
  }
  return intersect;
}
export function difference(dict1, dict2) {
  const wordsDict1 = Object.keys(dict1.dictionary);
  const wordsDict2 = Object.keys(dict2.dictionary);
  let diff = [];
  for (let i = 0; i < wordsDict1.length; i++) {
    if (!recursiveSearch(wordsDict2, wordsDict1[i], 0, wordsDict2.length - 1)) {
      diff.push(wordsDict1[i]);
    }
  }
  return diff;
}
export function union(dict1, dict2) {
  const wordsDict1 = Object.keys(dict1);
  const wordsDict2 = Object.keys(dict2);
  let unionWords = wordsDict1 + wordsDict2;
  return unionWords;
}
