import { Link } from 'react-router-dom'

function NotFound() {
	return (
		<div>
			<h2>404 NOT FOUND</h2>
			<Link to='/' >Home</Link>
		</div>
	)
}

export default NotFound
