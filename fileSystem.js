'use strict';

const async = require('async');
const fs = require('fs');
const osenv = require('osenv');
const path = require('path');

function getUsersHomeFolder() {
    return osenv.home();
}

function getFilesInFolder(folderPath, cb) {
    fs.readdir(folderPath, cb);
}

function inspectAndDescribeFile(filePath, cb) {
    let result = {
        file: path.basename(filePath),
        path: filePath,
        type: ''
    }

    fs.stat(filePath, (err, stat) => {
        if (err) {
            cb(err);
        } else {
            result.type = stat.isFile() ? 'file' : 'directory';
            console.log(result)
            cb(err, result)
        }
    })
}

function inspectAndDescribeFiles(folderPath, files, cb) {
    async.map(files, (file, asyncCb) => {
        let resolvedFilePath = path.resolve(folderPath, file);
        inspectAndDescribeFile(resolvedFilePath, asyncCb);
    }, cb)
}

module.exports = {
    getFilesInFolder,
    getUsersHomeFolder,
    inspectAndDescribeFiles
}