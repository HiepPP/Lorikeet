'use strict';

const lunr = require('lunr');
let index;

function resetIndex(files = []) {
  index = lunr(function () {
    this.field('file');
    this.field('type');
    this.ref('path');
    for (const file of files) {
      this.add({
                 "file": file.file,
                 "type": file.type,
                 "path": file.path
               });
    }
  });
}

function find(query, cb) {
  const results = index.search(query);
  if (results.length > 0) {
  }
  cb(results);
}

module.exports = {
  find,
  resetIndex
};
