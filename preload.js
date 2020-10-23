// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

// 2020-10-23 23:48 sheyifan Issue: put require to top
const { ipcRenderer} = require('electron')
window.addEventListener('DOMContentLoaded', () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector)
		if (element) element.innerText = text
	}

	for (const type of ['chrome', 'node', 'electron']) {
		replaceText(`${type}-version`, process.versions[type])
	}

	// 2020-10-23 sheyifan Issue: communicate between main and render process
	// 2020-10-23 23:48 sheyifan Issue: remove synchronize IPC(internal process communication)
	// 2020-10-23 23:48 sheyifan Issue: run IPC after dom loaded (put into block)
	ipcRenderer.on('asynchronous-reply', (event, arg) => {
		console.log(arg) // prints "pong"
	})
	ipcRenderer.send('asynchronous-message', 'ping')
})

