'use strict';

const userInterface = require('./userInterface');
const fileSystem = require('./fileSystem');

function main() {
  userInterface.bindDocument(window);
  const folderPath = fileSystem.getUsersHomeFolder();
  // fileSystem.getFilesInFolder(folderPath, (err, files) => {
  //   if (err) {
  //     return alert('Sorry, you could not load your home folder');
  //   }
  //   fileSystem.inspectAndDescribeFiles(folderPath, files, userInterface.displayFiles);
  // })
  userInterface.loadDirectory(folderPath)(window);
}

window.onload = main();
