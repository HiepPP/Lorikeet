'use strict';

let document;
const fileSystem = require('./fileSystem');
const {resetIndex} = require('./search');

function displayFolderPath(folderPath) {
  document.getElementById('current-folder').innerText = folderPath;
}

function clearView() {
  const mainArea = document.getElementById('main-area');
  let firstChild = mainArea.firstChild;
  while (firstChild) {
    mainArea.removeChild(firstChild);
    firstChild = mainArea.firstChild;
  }
}

const loadDirectory = (folderPath) => (window) => {
  if (!document) {
    document = window.document;
  }
  displayFolderPath(folderPath);
  fileSystem.getFilesInFolder(folderPath, (err, files) => {
    clearView();
    if (err) {
      return alert('Sorry, you could not load your folder');
    }
    fileSystem.inspectAndDescribeFiles(folderPath, files, displayFiles);
  })
};

function displayFile(file) {
  const mainArea = document.getElementById('main-area');
  const template = document.querySelector('#item-template');
  let clone = document.importNode(template.content, true);
  clone.querySelector('img').src = `images/${file.type}.svg`;
  clone.querySelector('img').setAttribute('data-filePath', file.path);

  if (file.type === 'directory') {
    clone.querySelector('img').addEventListener('dblclick', () => {
      loadDirectory(file.path)();
    }, false);
  }

  clone.querySelector('.filename').innerText = file.file;
  mainArea.appendChild(clone);
}

function displayFiles(err, files) {
  if (err) {
    return alert('Sorry, you could not display your files');
  }
  resetIndex(files);
  files.forEach(displayFile);
}

function bindDocument(window) {
  if (!document) {
    document = window.document;
  }
}

function bindSearchField(cb) {
  document.getElementById('search').addEventListener('keyup', cb, false);
}

function filterResults(results) {
  const validFilePaths = results.map(result => {
    return result.ref;
  });
  const items = document.getElementsByClassName('item');
  for (var i = 0; i < items.length; i++) {
    let item = items[i];
    let filePath = item.getElementsByTagName('img')[0].getAttribute('data-filepath');
    if (validFilePaths.indexOf(filePath) !== -1) {
      item.style = null;
    } else {
      item.style = 'display:none';
    }
  }
}

function resetFilter() {
  const items = document.getElementsByClassName('item');
  for (var i = 0; i < items.length; i++) {
    items[i].style = null;
  }
}

module.exports = {
  bindDocument,
  displayFiles,
  loadDirectory,
  bindSearchField,
  filterResults,
  resetFilter
};
