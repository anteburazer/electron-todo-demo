const { BrowserWindow, app, ipcMain } = require('electron');
const path = require('path');

const homeUrl = 'http://localhost:3000';
let mainWindow;

const createBrowserWindow = (url) => {
    let window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    window.loadURL(url || homeUrl);

    window.once('ready-to-show', () => window.show());
    window.on('closed', () => window = null);

    if (url === homeUrl) {
        mainWindow = window;
    }
};

const destroyWindow = (webContents) => {
    const window = BrowserWindow.fromWebContents(webContents);

    if (window && !window.isDestroyed()) {
        window.destroy();
    }
}

const initMain = () => {
    createBrowserWindow(homeUrl);

    ipcMain.on('edit-todo', (event, todo) => {
        // Open new browser window with edit screen
        createBrowserWindow(`${homeUrl}/edit/${todo.id}?name=${todo.name}`);
    });

    ipcMain.on('submit-todo', (event, todo) => {
        // Send IPC event to main renderer window
        mainWindow && mainWindow.webContents.send('todo-submitted', todo);
        // Close edit window
        destroyWindow(event.sender);
    });

    ipcMain.on('cancel-todo', (event) => {
        // Close edit window
        destroyWindow(event.sender);
    });
};

app.on('ready', () => initMain());