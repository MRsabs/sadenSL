// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
} = require('electron-devtools-installer');

// files
require('./db/init');
require('./ipc');

// app.whenReady().then(() => {
//   installExtension(REACT_DEVELOPER_TOOLS)
//     .then((name) => console.log(`Added Extension:  ${name}`))
//     .catch((err) => console.log('An error occurred: ', err));
// });
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      // nodeIntegrationInWorker: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, '../renderer/dist/index.html'));
  // mainWindow.loadFile(path.join(__dirname, './index.html'));
  isDev ? mainWindow.webContents.openDevTools() : null;
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('toMain', (event, args) => {
  event.sender.send('fromMain', 'got you');
  // fs.readFile("path/to/file", (error, data) => {
  //   // Do something with file contents

  //   // Send result back to renderer process
  //   // win.webContents.send("fromMain", responseObj);
  // });
});
