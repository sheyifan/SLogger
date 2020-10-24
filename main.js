// Modules to control application life and create native browser window
// 2020-10-23 23:48 sheyifan Issue: put 'require' to top
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const fs = require('fs')

const sf = require('./utils/sfile')
const sd = require('./utils/sdate')

let date = {
	year: 0,
	month: 0,
	day: 0,
	hour: 0,
	minute: 0,
	second: 0,
	miliSecond: 0
}

function createWindow () {
	const browserWindowProfile = sf.toJson("./profile/browserwindow.json")

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
	let webContents = mainWindow.webContents
	webContents.openDevTools()
	// 2020-10-24 15:39 sheyifan Issue: event 'dom-ready' will emitted each time DOM finished rendering
	webContents.on('dom-ready', (event) => {
		// 2020-10-24 16:05 sheyifan Issue: get file path of HTML in main process
		console.log(webContents.getURL())
		if(webContents.getURL().endsWith('index.html')) {
			date = sd.getDate()
			console.log(date)

			let js = fs.readFileSync("./data/syf-chart.js")
			// 2020-10-24 16:50 sheyifan Issue: execute javascript in render process with the following.
			// Can use complete version of Node.js API in main.js
			webContents.executeJavaScript(js.toString())
		}
	})
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
	ipcMain.on('need-data', (event, arg) => {
	  console.log("Receive:" + arg) // prints message got
	  event.sender.send('data', fs.readFileSync("./data/log/2020/10/24.json").toString())
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
