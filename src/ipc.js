import { ipcMain } from 'electron-better-ipc';
import { nwc, unixNow } from './util/native';

ipcMain.answerRenderer('nwc', async (x) => {
  return nwc(x);
});

ipcMain.answerRenderer('unixNow', async () => {
  return unixNow();
});
