const { ipcMain } = require('electron-better-ipc');
const { nwc } = require('./util/native/index');

ipcMain.answerRenderer('nwc', async (x) => {
  return nwc(x);
});
