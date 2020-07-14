const fs = require('fs-extra');
const spawn = require('cross-spawn');
const Path = require('path');

const renderer = Path.join(__dirname, '../renderer');
const main = Path.join(__dirname, '../');

if (process.env.TARGET === 'linux') {
  npmRun(['build'], renderer);
  npmRun(['native:prod'], main);
  npmRun(['bundle:prod'], main);
  npxRun(['electron-builder', 'build', '-l', '--ia32', '--x64', '--armv7l', '--arm64'], main);
} else if (process.env.TARGET === 'win') {
  npmRun(['build'], renderer);
  npmRun(['native:prod'], main);
  npmRun(['bundle:prod'], main);
  npxRun(['electron-builder', 'build', '-w', '--ia32', '--x64', '--arm64'], main);
} else {
  console.error('unknown target: ' + process.env.TARGET)
  process.exit(1)
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
