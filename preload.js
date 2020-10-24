// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

// 2020-10-23 23:48 sheyifan Issue: put require to top
var ipcRenderer = require('electron').ipcRenderer;
window.addEventListener('DOMContentLoaded', function () {
    var replaceText = function (selector, text) {
        var element = document.getElementById(selector);
        if (element)
            element.innerText = text;
    };
    for (var _i = 0, _a = ['chrome', 'node', 'electron']; _i < _a.length; _i++) {
        var type = _a[_i];
        replaceText(type + "-version", process.versions[type]);
    }
    // 2020-10-23 sheyifan Issue: communicate between main and render process
    // 2020-10-23 23:48 sheyifan Issue: remove synchronize IPC(internal process communication)
    // 2020-10-23 23:48 sheyifan Issue: run IPC after dom loaded (put into block)
    ipcRenderer.on('asynchronous-reply', function (event, arg) {
        console.log(arg); // prints "pong"
    });
	ipcRenderer.send('asynchronous-message', 'ping');
	
	// 2020-10-24 16:52 sheyifan Issue: operate DOM in rendering process with the following. Can
	// use complete version of Node.js API in preload.js (except something about 'main', so cannot
	// execute execute javascript in rendering process
	if(window.document.location.href.endsWith('index.html')) {
		document.getElementById('msg-badge').innerHTML = 99;
	}
});