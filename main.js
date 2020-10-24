// Modules to control application life and create native browser window
// 2020-10-23 23:48 sheyifan Issue: put 'require' to top
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
// 2020-10-24 11:11 sheyifan Issue: import module about file stream processing
const fs = require('fs')
const sf = require('./utils/sfile')

function createWindow () {
	const browserWindowProfile = sf.toJson("./profile/browserwindow.json")
	console.log(browserWindowProfile)

	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: browserWindowProfile.width,
		height: browserWindowProfile.height,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: browserWindowProfile.webPreferences.nodeIntegration
		},
		resizable: browserWindowProfile.resizable
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
