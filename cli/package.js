const spawn = require('cross-spawn');
const Path = require('path');
const fs = require('fs-extra');

const renderer = Path.join(__dirname, '../renderer');
const main = Path.join(__dirname, '../');

clean();

switch (process.env.TARGET) {
  case 'linux':
    buildRust();
    buildRenderer();
    buildMain();
    packForLinux();
    break;

  case 'windows':
    buildRust();
    buildRenderer();
    buildMain();
    packForWindows();
    break;

  case 'all':
    buildRust();
    buildRenderer();
    buildMain();
    packAll();
    break;

  case 'test':
    buildRust(true);
    buildRenderer();
    buildMain();
    packForLinux(true);
    break;

  default:
    console.error('unknown target: ' + process.env.TARGET);
    process.exit(1);
}

function npmRun(commands, cwd) {
  spawn.sync('npm', ['run', ...commands], {
    stdio: 'inherit',
    cwd,
  });
}
function npxRun(commands, cwd) {
  spawn.sync('npx', [...commands], {
    stdio: 'inherit',
    cwd,
  });
}

function buildRenderer() {
  npmRun(['build'], renderer);
}

function buildMain() {
  npmRun(['build'], main);
}

function packForWindows() {
  npxRun(['electron-builder', 'build', '-w'], main);
}

function packForLinux(test = false) {
  if (test) {
    const buildConfig = Path.join(__dirname, '../electron-builder.json');
    const tmpConfig = Path.join(__dirname, './tmp.json');
    const arrConfig = [
      'electron-builder',
      'build',
      '--dir',
      '-c.compression=store',
      '--config',
      tmpConfig,
    ];
    const testConfig = JSON.parse(fs.readFileSync(buildConfig).toString());
    testConfig.asar = false;
    fs.writeFileSync(tmpConfig, JSON.stringify(testConfig));
    npxRun(arrConfig, main);
    fs.removeSync(tmpConfig);
  } else {
    npxRun(['electron-builder', 'build', '-l'], main);
  }
}

function packAll() {
  npxRun(['electron-builder', 'build', '-l', '-w'], main);
}

function buildRust(test = false) {
  const build = require('./buildNative');
  if (test) {
    build('development');
  } else {
    build('production');
  }
}

function clean() {
  require('./clean')();
}
