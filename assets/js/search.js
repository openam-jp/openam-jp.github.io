const locale = ['ja'];
const keywordsId = 'search-keywords';
const keywordsElement = document.getElementById(keywordsId);
const resultsId = 'search-results';
const resultsElement = document.getElementById(resultsId);
const tableId = 'table';
const gt = '>';
const gtRegexp = new RegExp('&amp;gt;', 'g');
const lt = '<';
const ltRegexp = new RegExp('&amp;lt;', 'g');
const amp = '&';
const ampRegexp = new RegExp('&amp;amp;', 'g');
const sQuot = '\'';
const sQuotRegexp = new RegExp('&#39;', 'g');
const baseurl = keywordsElement.getAttribute('data-baseurl');
let parsedJson = '';
let previousKeywords = '';
let previousSearch = '';
let _isComposing = false;

async function searchContents() {
  let keywords = keywordsElement.value;
  if (!keywords) {
    resetSearch();
    return;
  } else if (_isComposing) {
    if (event.inputType) {
      if (event.inputType != 'insertCompositionText') {
      }
    } else {
      return;
    }
  }

  let results = [];
  let json;
  if (keywords.slice(0, -1) == previousKeywords && previousSearch) {
    json = previousSearch;
  } else {
    json  = await getJson();
  }
  previousKeywords = keywords;

  // half or full width space.
  keywords = keywords.split(/[ 　]/);
  let regexp = '';
  for (let keyword of keywords) {
    if (keyword) {
      if (keyword.charAt(0) == '-' && !keyword.slice(1)) {
        continue;
      } else if (keyword.charAt(0) == '-') {
        regexp = regexp + '(?!.*' + keyword.slice(1) + ')';
      } else {
        regexp = regexp + '(?=.*' + keyword + ')';
      }
    }
  }
  regexp = '^' + regexp;
  regexp = new RegExp(regexp, 'i');

  let index;
  if (baseurl) {
    index = 2;
  } else {
    index = 1;
  }
  for (let j of json) {
    if (locale.includes(location.pathname.split('/')[index])) {
      if (location.pathname.split('/')[index] != j.url.split('/')[1]) {
        continue;
      }
     } else {
      if (locale.includes(j.url.split('/')[1])) {
        continue;
      }
    }
    let tags = '';
    for (let tag of j.tags) {
      tags = tags + tag;
    }
    let contents = j.title + j.subtitle + tags + j.content;
    if (regexp.test(contents)) {
      results.push(j);
    }
  }
  if (keywords.slice(-1)[0].charAt(0) != '-') {
    previousSearch = results;
  }

  const tableElement = document.getElementById(tableId);
  if (tableElement) {
    tableElement.parentNode.removeChild(tableElement);
  }
  if (resultsElement.hasChildNodes()) {
     resultsElement.removeChild(resultsElement.firstChild);
  }

  let display = keywordsElement.getAttribute('data-result-text');
  let hitCounter = document.createElement('p');
  if (results.length) {
    hitCounter.innerHTML = display + results.length;
    resultsElement.appendChild(hitCounter);
    let table = document.createElement('table');
    table.setAttribute('id', tableId);
    let tbody = document.createElement('tbody');
    for (result of results) {
      let link1 = document.createElement('a');
      link1.href = location.origin + baseurl + result.url;
      link1.appendChild(document.createTextNode(unescapeString(result.title)));
      let link2 = document.createElement('a');
      link2.href = location.origin + baseurl + result.url;
      let tr = document.createElement('tr');
      let td1 = document.createElement('td');
      td1.appendChild(link1);
      if (result.tags[0]) {
        for (let tag of result.tags) {
          let code = document.createElement('code');
          code.innerHTML = unescapeString(tag);
          link2.appendChild(code);
        }
        link2.appendChild(document.createElement('br'));
      }
      let content;
      if (result.content.length > 30) {
        content = result.content.substring(0, 30) + '...';
      } else {
        content = result.content;
      }
      link2.appendChild(document.createTextNode(unescapeString(content)));
      let td2 = document.createElement('td');
      td2.appendChild(link2);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    resultsElement.appendChild(table);
  } else {
    hitCounter.innerHTML = display + '0';
    hitCounter.className = 'no-result';
    resultsElement.appendChild(hitCounter);
  }
}

function unescapeString(str) {
  str = str.replace(gtRegexp, gt);
  str = str.replace(ltRegexp, lt);
  str = str.replace(ampRegexp, amp);
  str = str.replace(sQuotRegexp, sQuot);
  return str;
}

function getJson() {
  return new Promise((resolve, reject) => {
    if (!parsedJson) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', location.origin + baseurl + '/search.json', true);
      xhr.send();
      xhr.addEventListener('load', (event) => {
        parsedJson = JSON.parse(xhr.response);
        resolve(parsedJson);
      });
    } else {
      resolve(parsedJson);
    }
  });
}

function isComposing() {
  _isComposing = event.isComposing;
}

function resetSearch() {
  keywordsElement.value = '';
  const tableElement = document.getElementById(tableId);
  if (tableElement) {
    tableElement.parentNode.removeChild(tableElement);
  }
  if (resultsElement.hasChildNodes()) {
    resultsElement.removeChild(resultsElement.firstChild);
  }
}
