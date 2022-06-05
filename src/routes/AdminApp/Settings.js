import { useNavigate } from 'react-router-dom'

function AdminSettings () {
	let navigate = useNavigate()

	const logOut = () => {
		// remove all
		localStorage.removeItem('adminKey')
		localStorage.removeItem('adminKeyExp')
		localStorage.removeItem('superAdminKey')
		localStorage.removeItem('superAdminKeyExp')
		localStorage.removeItem('userKey')
		localStorage.removeItem('userKeyExp')

		navigate('/auth/admin/signin')
	}

	return (
		<div>
			<h2>Admin Settings</h2>
			<button onClick={logOut}>Log Out</button>
		</div>
	)
}

export default AdminSettings
