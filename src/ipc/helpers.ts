import { ipcMain } from 'electron-better-ipc';
import { nwc, unixNow } from '../util/native';

ipcMain.handle(
  'nwc',
  async (e, x: string): Promise<string> => {
    return nwc(x);
  }
);

ipcMain.handle('unixNow', async () => {
  return unixNow();
});

ipcMain.handle('hello', async () => {
  console.log('hello IPC IS CALLED');
  return 'hello from main';
});
