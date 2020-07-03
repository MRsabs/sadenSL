import { BrowserWindow } from 'electron';
import * as path from 'path';
import * as isDev from 'electron-is-dev';

export default function createWindow(
  winOpt: Electron.BrowserWindowConstructorOptions,
): Electron.BrowserWindow {
  const mainWindow = new BrowserWindow(winOpt);
  if (isDev) {
    mainWindow.loadURL('http://localhost:8080');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../renderer/dist/index.html'));
  }
  return mainWindow;
}
