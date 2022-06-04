function now() {
	return new Date().getTime()
}

function today() {
	var now = new Date()
	var today = now.getTime()
	// var offset = now.getTimezoneOffset() * 60 * 1000
	var offset = -360 * 60 * 1000 // fixed offset at, GMT +06:00
	today -= (today - offset) % (24 * 60 * 60 * 1000)
	return today
}

function thatDay(millis) {
	// string value safety
	if (typeof millis === 'string') {
		if (!isNaN(parseInt(millis))) {
			millis = parseInt(millis)
		} else {
			return false
		}
	}

	var thatDay = millis
	var offset = new Date(millis).getTimezoneOffset() * 60 * 1000
	thatDay -= (thatDay - offset) % (24 * 60 * 60 * 1000)
	return thatDay
}

function shortDate(millis) {
	const date = new Date(millis)
	const yyyy = date.getFullYear().toString()
	var dd = date.getDate()
	if (dd < 10) dd = '0' + dd
	else dd = '' + dd
	var mm = date.getMonth() + 1
	if (mm < 10) mm = '0' + mm
	else mm = '' + mm
	return dd + '/' + mm + '/' + yyyy
}

export default {
	now,
	today,
	thatDay,
	shortDate
}
