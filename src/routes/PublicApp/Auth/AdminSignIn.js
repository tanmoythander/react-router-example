import { useNavigate, Link } from 'react-router-dom'

function AdminSignIn() {
	let navigate = useNavigate()

	const signIn = () => {
		localStorage.setItem('adminKey', 'THIS_IS_DUMMY_TOKEN')
		localStorage.setItem(
			'adminKeyExp',
			(new Date().getTime() + 30 * 60 * 1000).toString()
		)
		// remove unwanted
		localStorage.removeItem('superAdminKey')
		localStorage.removeItem('superAdminKeyExp')
		localStorage.removeItem('userKey')
		localStorage.removeItem('userKeyExp')

		navigate('/admin')
	}

	return (
		<div>
			<h2>Admin Sign In</h2>
			<button onClick={signIn}>Sign In</button>
			<h1> </h1>
			<li><Link to='/'>Home</Link></li>
		</div>
	)
}

export default AdminSignIn
