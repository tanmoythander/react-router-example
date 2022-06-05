import { Link } from 'react-router-dom'

function UserDashboard () {
	return (
		<div>
			<h2>User Dashboard</h2>
			<li><Link to='settings'>Settings</Link></li>
			<li><Link to='/'>Home</Link></li>
			<li><Link to='/about'>About</Link></li>
		</div>
	)
}

export default UserDashboard
