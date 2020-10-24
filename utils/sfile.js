const fs = require('fs')

/**
 * 2020-10-24 11:24 sheyifan Issue: transfer from .json file to JSON object
 * @param jsonFilePath where the .json file locates
 * @returns JSON object
 */
function toJson(jsonFilePath) {
	let json = fs.readFileSync(jsonFilePath)
	return JSON.parse(json)
}

// 2020-10-24 11:45 sheyifan Issue: export element of module in Electron, in
// order for other modules to require
module.exports = {
	toJson
}