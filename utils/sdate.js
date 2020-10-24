/**
 * 2020-10-24 18.44 sheyifan Issue: transfer from .json file to JSON object
 * @returns JSON object indicating current date
 */
function getDate() {
	let now = new Date()
	return {
		year: now.getFullYear(),
		month: now.getMonth() + 1,
		day: now.getDate(),
		hour: now.getHours(),
		minute: now.getMinutes(),
		second: now.getSeconds(),
		miliSecond: now.getMilliseconds()
	}
}

module.exports = {
	getDate
}