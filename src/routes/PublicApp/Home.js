import { Link } from 'react-router-dom'

function Home () {
	return (
		<div>
			<h2>Home</h2>
			<li><Link to='/about'>About</Link></li>
			<li><Link to='/auth/admin/signin'>Admin Sign In</Link></li>
			<li><Link to='/auth/user/signin'>User Sign In</Link></li>
		</div>
	)
}

export default Home
