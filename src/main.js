import { app } from 'electron';
import * as db from './db/init';
import createWindow from './helpers/createWindow';

app.whenReady().then(async () => {
  try {
    if (
      (await db.authenticateDb()) &&
      (await db.syncDb()) &&
      (await db.testDb())
    ) {
      const window = createWindow({
        width: 1280,
        height: 720,
        show: false,
        webPreferences: {
          nodeIntegration: true,
          nodeIntegrationInWorker: true,
        },
      });
      window.webContents.on('dom-ready', () => window.show());
      await import('./ipc/helpers');
      await import('./store/storeDb');
    } else {
      const errorBox = (await import('./helpers/error')).default;
      const title = 'Something weng Wrong';
      const content = 'Try to reinstall the lastest version of the SadanSl';
      errorBox(title, content);
      app.quit();
    }
  } catch (error) {
    // TODO handle with user-friendly message
    app.exit(1);
  }
});
// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) createWindow();
// });
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });
