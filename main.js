// Modules to control application life and create native browser window
// 2020-10-23 23:48 sheyifan Issue: put require to top
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

function createWindow () {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1053,
		height: 620,
		webPreferences: {
		preload: path.join(__dirname, 'preload.js'),
		nodeIntegration: false
		},
		resizable: true
	})

	// and load the index.html of the app.
	mainWindow.loadFile('web/login.html')

	// Open the DevTools.
	mainWindow.webContents.openDevTools()

	console.log("loading" + mainWindow)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  	createWindow()
  
	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
	// 2020-10-23 23:48 sheyifan Issue: remove synchronize IPC
	ipcMain.on('asynchronous-message', (event, arg) => {
	  console.log(arg) // prints message got
	  event.sender.send('asynchronous-reply', 'pong')
	})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  	if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
