const spawn = require('cross-spawn');
const Path = require('path');

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

function packForLinux() {
  npxRun(['electron-builder', 'build', '-l', '-c.compression=store'], main);
}

function packAll() {
  npxRun(['electron-builder', 'build', '-l', '-w'], main);
}

function buildRust() {
  const build = require('./buildNative');
  build('production');
}

function clean() {
  require('./clean')();
}
