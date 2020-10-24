function getRadio(data) {
	let t0 = data.T0事项
	let t0Count = 0
	let t0Accomplished = 0
	if(t0 == undefined) {
		t0Count = 0
	}
	else {
		t0Count = t0.length
	}
	// Accomplished radio of T0 issues
	let t0Ratio = 0
	let t0RatioStr = ""
	if (t0Count === 0 || data.T0事项 == undefined) {
		t0Ratio = 0
		t0RatioStr = "0/0"
	}
	else {
		for (let issue of data.T0事项) {
			if (issue.完成状态 === 1) {
				t0Accomplished = t0Accomplished + 1
			}
		}
		t0Ratio = t0Accomplished / t0Count
		t0RatioStr = t0Accomplished.toString() + "/" + t0Count.toString()
	}

	let t1 = data.T1事项
	let t1Count = 0
	let t1Accomplished = 0
	if(t1 == undefined) {
		t1Count = 0
	}
	else {
		t1Count = t1.length
	}
	// Accomplished radio of T1 issues
	let t1Ratio = 0
	let t1RatioStr = ""
	if (t1Count === 0 || data.T1事项 == undefined) {
		t1Ratio = 0
		t1RatioStr = "0/0"
	}
	else {
		for (let issue of data.T1事项) {
			if (issue.完成状态 === 1) {
				t1Accomplished = t1Accomplished + 1
			}
		}
		t1Ratio = t1Accomplished / t1Count
		t1RatioStr = t1Accomplished.toString() + "/" + t1Count.toString()
	}

	let t2 = data.T2事项
	let t2Count = 0
	let t2Accomplished = 0
	if(t2 == undefined) {
		t2Count = 0
	}
	else {
		t2Count = t2.length
	}
	// Accomplished radio of T2 issues
	let t2Ratio = 0
	let t2RatioStr = ""
	if (t2Count === 0 || data.T2事项 == undefined) {
		t2Ratio = 0
		t2RatioStr = "0/0"
	}
	else {
		for (let issue of data.T2事项) {
			if (issue.完成状态 === 1) {
				t2Accomplished = t2Accomplished + 1
			}
		}
		t2Ratio = t2Accomplished / t2Count
		t2RatioStr = t2Accomplished.toString() + "/" + t2Count.toString()
	}

	let count = t0Count + t1Count + t2Count
	let accomplished = t0Accomplished + t1Accomplished + t2Accomplished
	ratio = count / accomplished
	ratioStr = accomplished.toString() + "/" + count.toString()

	return {
		T0事项完成率: {
			str: t0RatioStr,
			num: t0Ratio
		},
		T1事项完成率: {
			str: t1RatioStr,
			num: t1Ratio
		},
		T2事项完成率: {
			str: t2RatioStr,
			num: t2Ratio
		},
		总完成率: {
			str: ratioStr,
			num: ratio
		}
	}
}

module.exports = {
	getRadio
}