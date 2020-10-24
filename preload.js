// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

// 2020-10-23 23:48 sheyifan Issue: put require to top
var ipcRenderer = require('electron').ipcRenderer;
window.addEventListener('DOMContentLoaded', function () {
    var replaceText = function (selector, text) {
        var element = document.getElementById(selector)
        if (element)
            element.innerText = text
    }
    for (var _i = 0, _a = ['chrome', 'node', 'electron']; _i < _a.length; _i++) {
        var type = _a[_i]
        replaceText(type + "-version", process.versions[type])
    }
	
	// 2020-10-24 16:52 sheyifan Issue: operate DOM in rendering process with the following. Can
	// use complete version of Node.js API in preload.js (except something about 'main', so cannot
	// execute execute javascript in rendering process
	if(window.document.location.href.endsWith('index.html')) {
		// 2020-10-23 sheyifan Issue: communicate between main and render process
		// 2020-10-23 23:48 sheyifan Issue: remove synchronize IPC(internal process communication)
		// 2020-10-23 23:48 sheyifan Issue: run IPC after dom loaded (put into block)
		ipcRenderer.on('data', function (event, arg) {
			let data = JSON.parse(arg)
			let iss = require('./utils/issue')
			issueRatio = iss.getRadio(data)
			document.getElementById('T0-issue').innerHTML = issueRatio.T0事项完成率.str
			document.getElementById('T1-issue').innerHTML = issueRatio.T1事项完成率.str
			document.getElementById('T2-issue').innerHTML = issueRatio.T2事项完成率.str
			document.getElementById('issue').innerHTML = issueRatio.总完成率.str
		});
		ipcRenderer.send('need-data', '')
	}
})