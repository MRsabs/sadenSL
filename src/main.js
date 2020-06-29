import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as isDev from 'electron-is-dev';
import seq from './db/init';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    show: true,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, '../renderer/dist/index.html'));
  isDev ? mainWindow.webContents.openDevTools() : null;
  return mainWindow;
}

app.whenReady().then(() => {
  const window = createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
