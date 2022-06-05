import { useNavigate } from 'react-router-dom'

function UserSettings () {
	let navigate = useNavigate()

	const logOut = () => {
		// remove all
		localStorage.removeItem('adminKey')
		localStorage.removeItem('adminKeyExp')
		localStorage.removeItem('superAdminKey')
		localStorage.removeItem('superAdminKeyExp')
		localStorage.removeItem('userKey')
		localStorage.removeItem('userKeyExp')

		navigate('/auth/user/signin')
	}

	return (
		<div>
			<h2>User Settings</h2>
			<button onClick={logOut}>Log Out</button>
		</div>
	)
}

export default UserSettings
