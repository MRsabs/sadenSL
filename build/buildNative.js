const fs = require('fs-extra');
const spawn = require('cross-spawn');
const Path = require('path');

const addonDir = Path.join(__dirname, '../addon');
const addonFile = Path.join(__dirname, '../addon/native/index.node');
const addonDirElectron = Path.join(__dirname, '../src/util/native/');
const addonFileElectron = Path.join(__dirname, '../src/util/native/index.node');

spawn.sync('npm', ['run', process.env.NODE_ENV], {
  stdio: 'inherit',
  cwd: addonDir,
});

fs.removeSync(addonFileElectron);
fs.copySync(addonFile, addonFileElectron);
