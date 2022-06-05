import { Link } from 'react-router-dom'

function About () {
	return (
		<div>
			<h2>About</h2>
			<li><Link to='/'>Home</Link></li>
			<li><Link to='/auth/admin/signin'>Admin Sign In</Link></li>
			<li><Link to='/auth/user/signin'>User Sign In</Link></li>
		</div>
	)
}

export default About
