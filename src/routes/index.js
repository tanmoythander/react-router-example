import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom'

import ClockService from './../services/Clock'

function AdminProtectedRoute () {
	const adminToken = localStorage.getItem('adminKey')
	const adminTokenExp = parseInt(localStorage.getItem('adminKeyExp'))
	const superAdminToken = localStorage.getItem('superAdminKey')
	const superAdminTokenExp = parseInt(
		localStorage.getItem('superAdminKeyExp')
	)
	var status = undefined
	if (adminToken) {
		if (adminTokenExp > ClockService.now()) {
			// admin verified
			status = 'admin'
		}
	} else if (superAdminToken) {
		if (superAdminTokenExp > ClockService.now()) {
			// super admin verified
			status = 'superAdmin'
		}
	}

	return status === 'admin' || status === 'superAdmin' ? (
		<Outlet />
	) : (
		<Navigate
			to='/auth/admin/signin'
		/>
	)
}

function UserProtectedRoute () {
	const userToken = localStorage.getItem('userKey')
	const userTokenExp = parseInt(localStorage.getItem('userKeyExp'))
	if (userToken && userTokenExp > ClockService.now()) {
		return <Outlet />
	}
	return (
		<Navigate
			to='/auth/user/signin'
		/>
	)
}

function Home() {
	return <div>
		<h2>Home</h2>
		<Link to='about'>About</Link>
	</div>
}

function About() {
	return <div>
		<h2>
			About
		</h2>
		<Link to='/'>Home</Link>
	</div>
}

function App() {

	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='about' element={<About />} />

			{/* Authentication Routes */}
			<Route path='auth'>
				<Route path='admin'>
					<Route path='signin' element={<h1>Admin Sign In</h1>} />
				</Route>
				<Route path='user'>
					<Route path='signin' element={<h1>User Sign In</h1>} />
				</Route>
			</Route>

			{/* Admin Routes */}
			<Route path='admin' element={<AdminProtectedRoute />}>
				<Route path='' element={<h1>Admin Dashboard</h1>} />
				<Route path='about' element={<h1>Admin About</h1>} />
			</Route>

			{/* User Routes */}
			<Route path='user' element={<UserProtectedRoute />}>
				<Route path='' element={<h1>User Dashboard</h1>} />
				<Route path='about' element={<h1>User About</h1>} />
			</Route>
		</Routes>
	);
}

export default App;
