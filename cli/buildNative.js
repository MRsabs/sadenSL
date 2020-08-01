const fs = require('fs-extra');
const spawn = require('cross-spawn');
const Path = require('path');

const addonDir = Path.join(__dirname, '../addon');
const addonFile = Path.join(__dirname, '../addon/native/index.node');
const addonFileElectron = Path.join(__dirname, '../src/util/index.node');

if (require.main === module) {
  main();
}

function main(env = process.env.NODE_ENV) {
  switch (env) {
    case 'development':
      build('dev');
      break;
    case 'production':
      build('build');

      break;
    default:
      console.error('unknown ENV: ' + env);
      process.exit(1);
  }
  moveFiles();
}

function moveFiles() {
  fs.removeSync(addonFileElectron);
  fs.copySync(addonFile, addonFileElectron);
}

function build(forEnv) {
  spawn.sync('npm', ['run', forEnv], {
    stdio: 'inherit',
    cwd: addonDir,
  });
}

module.exports = main;
