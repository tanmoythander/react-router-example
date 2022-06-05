import { useNavigate, Link } from 'react-router-dom'

function UserSignIn() {
	let navigate = useNavigate()

	const signIn = () => {
		localStorage.setItem('userKey', 'THIS_IS_DUMMY_TOKEN')
		localStorage.setItem(
			'userKeyExp',
			(new Date().getTime() + 30 * 60 * 1000).toString()
		)
		// remove unwanted
		localStorage.removeItem('superAdminKey')
		localStorage.removeItem('superAdminKeyExp')
		localStorage.removeItem('adminKey')
		localStorage.removeItem('adminKeyExp')

		navigate('/user')
	}

	return (
		<div>
			<h2>User Sign In</h2>
			<button onClick={signIn}>Sign In</button>
			<h1> </h1>
			<li><Link to='/'>Home</Link></li>
		</div>
	)
}

export default UserSignIn
