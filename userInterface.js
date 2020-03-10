'use strict';

let document;
const fileSystem = require('./fileSystem');

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

function loadDirectory(folderPath) {
    return function (window) {
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
    }
}

function displayFile(file) {
    const mainArea = document.getElementById('main-area');
    const template = document.querySelector('#item-template');
    let clone = document.importNode(template.content, true);
    clone.querySelector('img').src = `images/${file.type}.svg`;

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
    files.forEach(displayFile);
}

function bindDocument(window) {
    if (!document) {
        document = window.document;
    }
}

module.exports = {
    bindDocument,
    displayFiles,
    loadDirectory
}