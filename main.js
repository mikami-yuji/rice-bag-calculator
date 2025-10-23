const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // Note: contextIsolation and nodeIntegration might need adjustment
      // depending on the content of your HTML's JavaScript.
      // For security reasons, the defaults are recommended.
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  // Load the HTML file.
  mainWindow.loadFile('米袋計算ツール.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
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

// Create a basic preload.js file as it's referenced in the main process.
// This can be expanded later if needed.
const fs = require('fs');
if (!fs.existsSync(path.join(__dirname, 'preload.js'))) {
  fs.writeFileSync(path.join(__dirname, 'preload.js'), '// Preload script can go here.');
}
