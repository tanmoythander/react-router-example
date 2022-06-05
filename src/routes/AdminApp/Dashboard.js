import { Link } from 'react-router-dom'

function AdminDashboard () {
	return (
		<div>
			<h2>Admin Dashboard</h2>
			<li><Link to='settings'>Settings</Link></li>
			<li><Link to='/'>Home</Link></li>
			<li><Link to='/about'>About</Link></li>
		</div>
	)
}

export default AdminDashboard
