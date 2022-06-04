/**
 * @param {
 *   url: '/user/profile',
 *   method: 'POST',
 *   body: {
 *     name: 'John Doe'
 *   },
 *   addToken: true
 * } data
 */
var send = async data => {
	var request = {
		method: data.method.toUpperCase(),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'app-key': process.env.REACT_APP_ADMIN_API_KEY
		}
	}
	if (data.method.toUpperCase() !== 'GET' && data.body) {
		request['body'] = JSON.stringify(data.body)
	}
	if (data.addToken) {
		var adminToken = localStorage.getItem('adminKey')
		var superAdminToken = localStorage.getItem('superAdminKey')
		if (adminToken && adminToken.length > 10) {
			request.headers['admin-key'] = adminToken
		} else if (superAdminToken && superAdminToken.length > 10) {
			request.headers['super-admin-key'] = superAdminToken
		}
	}
	return fetch(process.env.REACT_APP_API_URL + data.url, request)
		.then(response => {
			return response.json()
		})
		.then(json => {
			// console.debug(json)
			// if (json.message === 'Token is dead') {
			// 	NavigationService.navigate('AuthenticationLogin')
			// 	Alert.alert(
			// 		'Logged Out',
			// 		'Your previous login has expired, please login again',
			// 		[
			// 			{ text: 'OK' }
			// 		],
			// 		{ cancelable: false }
			// 	)
			// }
			return json
		})
		.catch(err => {
			// Alert.alert(
			// 	err.message ? err.message : 'Network Issue Detected',
			// 	'Please try again',
			// 	[
			// 		{ text: 'OK' }
			// 	],
			// 	{ cancelable: true }
			// )
			console.error(err)
			return Promise.reject(err)
		})
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	send
}
