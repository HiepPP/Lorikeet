'use strict';

const userInterface = require('./userInterface');
const fileSystem = require('./fileSystem');
const search = require('./search');

function main() {
  userInterface.bindDocument(window);
  const folderPath = fileSystem.getUsersHomeFolder();
  userInterface.loadDirectory(folderPath)(window);
  userInterface.bindSearchField(event => {
    const query = event.target.value;
    if (query === '') {
      userInterface.resetFilter();
    } else {
      search.find(query, userInterface.filterResults);
    }
  })
}

window.onload = main();
