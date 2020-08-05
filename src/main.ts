/* eslint-disable @typescript-eslint/no-unused-vars */
import { app } from 'electron';
import * as db from './db/init';
import createWindow from './helpers/createWindow';

app.whenReady().then(async () => {
  try {
    if ((await db.authenticateDb()) && (await db.syncDb())) {
      const window = createWindow({
        width: 1280,
        height: 720,
        show: false,
        frame: true,
        webPreferences: {
          nodeIntegration: true,
          nodeIntegrationInWorker: true,
        },
      });
      window.webContents.on('dom-ready', () => window.show());
      // await import('./ipc/helpers');
      // await (await import('./ipc/db/index')).default();
      (await import('./ipc/initIpc')).default();
      await import('./updater/main');
      // await import('./store/storeDb');
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

// TODO something  should be here have to do with electron on mac
