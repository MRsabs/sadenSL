const spawn = require('cross-spawn');
const Path = require('path');
const fs = require('fs-extra');

const renderer = Path.join(__dirname, '../renderer');
const main = Path.join(__dirname, '../');

if (clean() && process.env.TEST === 'true') {
  BuildApp(true);
} else {
  BuildApp();
}

function BuildApp(test = false) {
  switch (process.platform) {
    case 'linux':
      test ? buildRust() : buildRust(true);
      buildRenderer();
      buildMain();
      test ? packForLinux() : packForLinux(true);
      break;

    case 'win32':
      test ? buildRust() : buildRust(true);
      buildRenderer();
      buildMain();
      test ? packForWindows() : packForWindows(true);
      break;

    default:
      console.error('un-supported target: ' + process.env.TARGET);
      process.exit(1);
  }
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

function testPacked() {
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
}

function packForWindows(test = false) {
  test ? testPacked() : npxRun(['electron-builder', 'build', '-w'], main);
}

function packForLinux(test = false) {
  test ? testPacked() : npxRun(['electron-builder', 'build', '-l'], main);
}

function buildRust(test = false) {
  const build = require('./buildNative');
  test ? build('development') : build('production');
}

function clean() {
  require('./clean')();
}
