import { autoUpdater } from 'electron-updater';
import { ipcMain } from 'electron';

autoUpdater.autoDownload = false;
autoUpdater.channel = 'beta';

autoUpdater.on('error', (err) => {
  console.log(err);
});

autoUpdater.on('checking-for-update', () => {
  console.log('checking for an update has started');
});

// autoUpdater.on('update-available', ({ version, files }) => {
//   console.log('update available');
// });

autoUpdater.on('download-progress', (data) => {
  console.log('download-in-progress\n', data);
});

autoUpdater.on('update-downloaded', () => {
  console.log('update-downloaded');
  autoUpdater.quitAndInstall();
});

ipcMain.handle('update/check', async () => {
  try {
    const value = await checkForUpdates();
    return value;
  } catch (error) {
    return error;
  }
});

ipcMain.handle('update/download', async () => {
  try {
    await autoUpdater.downloadUpdate();
    return true;
  } catch (error) {
    return error;
  }
});

ipcMain.handle('update/channel', async (e, channel) => {
  try {
    switch (channel) {
      case 'alpha':
        autoUpdater.channel = 'latest';
        break;
      case 'beta':
        autoUpdater.channel = 'beta';
        break;
      case 'latest':
        autoUpdater.channel = 'latest';
        break;

      default:
        autoUpdater.channel = 'latest';
        break;
    }
    return true;
  } catch (error) {
    return error;
  }
});

function checkForUpdates(): Promise<{ version: string; files: [] }> {
  return new Promise((resolve, reject) => {
    autoUpdater.on('update-available', ({ version, files }) => {
      resolve({ version, files });
    });
    autoUpdater.on('error', (err) => {
      reject(err);
    });
    autoUpdater.checkForUpdates();
  });
}
