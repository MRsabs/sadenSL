const spawn = require('cross-spawn');
const Path = require('path');
const fs = require('fs-extra');

const renderer = Path.join(__dirname, '../renderer');
const main = Path.join(__dirname, '../');

if (clean() && process.env.TEST === 'true') {
  BuildApp({ testing: true });
} else {
  BuildApp({ testing: false });
}

function BuildApp({ testing }) {
  switch (process.platform) {
    case 'linux':
      testing ? buildRust({ testing: true }) : buildRust({ testing: false });
      buildRenderer();
      buildMain();
      testing
        ? packForLinux({ testing: true })
        : packForLinux({ testing: false });
      break;

    case 'win32':
      testing ? buildRust({ testing: true }) : buildRust({ testing: false });
      buildRenderer();
      buildMain();
      testing
        ? packForLinux({ testing: true })
        : packForLinux({ testing: false });
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

function packForWindows({ testing }) {
  testing ? testPacked() : npxRun(['electron-builder', 'build', '-w'], main);
}

function packForLinux({ testing }) {
  testing ? testPacked() : npxRun(['electron-builder', 'build', '-l'], main);
}

function buildRust({ testing }) {
  const build = require('./buildNative');
  testing ? build('development') : build('production');
}

function clean() {
  require('./clean')();
}
