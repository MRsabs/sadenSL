import { BrowserWindow } from 'electron';
import * as path from 'path';
import * as os from 'os';
import isDev from 'electron-is-dev';

export default function createWindow(
  winOpt: Electron.BrowserWindowConstructorOptions
): Electron.BrowserWindow {
  const mainWindow = new BrowserWindow(winOpt);
  if (isDev) {
    mainWindow.loadURL('http://localhost:8080');
    mainWindow.webContents.openDevTools();
    loadDevTools(mainWindow);
  } else {
    mainWindow.loadFile(path.join(__dirname, './erenderer/index.html'));
  }
  return mainWindow;
}

function loadDevTools(window: BrowserWindow) {
  const ReactDevTool = path.join(
    os.homedir(),
    '.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.8.2_0/'
  );
  window.webContents.session
    .loadExtension(ReactDevTool)
    .catch(() => console.error('error loading exntention'));
}
