const fs = require('fs-extra');
const Path = require('path');

function main(dirs = ['dist', 'tmp']) {
  dirs.map((dir) => {
    const target = Path.join(__dirname, '../' + dir);
    if (fs.existsSync(target)) {
      fs.removeSync(target);
    }
  });
}

module.exports = main;
