import { useState } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'

import ClockService from './../../services/Clock'

const AdminProtectedRoute = ({ element: Component, location, ...rest }) => (
	<Route
		{...rest}
		render={props => {
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
				<Component {...props} />
			) : (
				<Navigate
					to='/admin/signin'
          state={{ from: location }}
				/>
			)
		}}
	/>
)

const UserProtectedRoute = ({ element: Component, location, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			const userToken = localStorage.getItem('userKey')
			const userTokenExp = parseInt(localStorage.getItem('userKeyExp'))
			if (userToken && userTokenExp > ClockService.now()) {
				return <Component {...props} />
			}
			return (
				<Navigate
					to='/user/signin'
          state={{ from: location }}
				/>
			)
		}}
	/>
)

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
    </Routes>
  );
}

export default App;
