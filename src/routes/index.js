import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import ClockService from './../services/Clock'

import Home from './PublicApp/Home'
import About from './PublicApp/About'
import NotFound from './PublicApp/404'

import AdminSignIn from './PublicApp/Auth/AdminSignIn'
import UserSignIn from './PublicApp/Auth/UserSignIn'

import AdminDashboard from './AdminApp/Dashboard'
import AdminSettings from './AdminApp/Settings'

import UserDashboard from './UserApp/Dashboard'
import UserSettings from './UserApp/Settings'

function AuthRedirectRoute () {
	const adminToken = localStorage.getItem('adminKey')
	const adminTokenExp = parseInt(localStorage.getItem('adminKeyExp'))
	const superAdminToken = localStorage.getItem('superAdminKey')
	const superAdminTokenExp = parseInt(
		localStorage.getItem('superAdminKeyExp')
	)
	const userToken = localStorage.getItem('userKey')
	const userTokenExp = parseInt(localStorage.getItem('userKeyExp'))

	let redirectRoute = undefined
	if (adminToken) {
		if (adminTokenExp > ClockService.now()) {
			// admin verified
			redirectRoute = '/admin'
		}
	} else if (superAdminToken) {
		if (superAdminTokenExp > ClockService.now()) {
			// super admin verified
			redirectRoute = '/admin'
		}
	} else if (userToken && userTokenExp > ClockService.now()) {
		redirectRoute = '/user'
	}

	if (redirectRoute) {
		return <Navigate to={redirectRoute} />
	} else {
		return <Outlet />
	}
}

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

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='about' element={<About />} />

			{/* Authentication Routes */}
			<Route path='auth' element={<AuthRedirectRoute />}>
				<Route path='admin'>
					<Route path='signin' element={<AdminSignIn />} />
				</Route>
				<Route path='user'>
					<Route path='signin' element={<UserSignIn />} />
				</Route>
			</Route>

			{/* Admin Routes */}
			<Route path='admin' element={<AdminProtectedRoute />}>
				<Route path='' element={<AdminDashboard />} />
				<Route path='settings' element={<AdminSettings />} />
			</Route>

			{/* User Routes */}
			<Route path='user' element={<UserProtectedRoute />}>
				<Route path='' element={<UserDashboard />} />
				<Route path='settings' element={<UserSettings />} />
			</Route>

			{/* 404 */}
			<Route path='404' element={<NotFound />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
}

export default App;
