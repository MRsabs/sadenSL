/* eslint-disable */ 
import { autoUpdater } from 'electron-updater';
import { ipcMain } from 'electron';

autoUpdater.autoDownload = false;
autoUpdater.channel = 'latest'

autoUpdater.on('error', (err) => {
  console.log(err);
});

autoUpdater.on('checking-for-update', () => {
  console.log('checking for an update has started');
});

autoUpdater.on('update-available', (info) => {
  console.log('update available');
  console.log(info);
});

autoUpdater.on('download-progress', (data) => {
  console.log('download-in-progress');
});

autoUpdater.on('update-downloaded', (data) => {
  console.log('update-downloaded');
});

ipcMain.handle('checking-for-update', async () => {
    try {
      const value = await  autoUpdater.checkForUpdates()
      return value;
    } catch (error) {
      return error;
    }
});