import { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authActions } from './store/auth';
import Layout from './layout/Layout';
import HomePage from './pages/Home';
import LoginPage from './pages/Auth/Login';
import SignupPage from './pages/Auth/Signup';

import Socketio from './pages/Socketio/Socket';

import NotFound from './pages/NotFound';

import './App.css';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const token = localStorage.getItem('token');
		const user = localStorage.getItem('user');
		console.log(token, user);
		if (token) {
			dispatch(
				authActions.setAuthenticated({
					token: token,
					user: JSON.parse(user),
				})
			);
		}
	}, [dispatch]);

	return (
		<Layout>
			<Switch>
				<Route path='/' exact>
					<Redirect to='/home' />
				</Route>
				<Route path='/home'>
					<HomePage />
				</Route>
				<Route path='/login'>
					<LoginPage />
				</Route>
				<Route path='/signup'>
					<SignupPage />
				</Route>
				<Route path='/socketio'>
					<Socketio />
				</Route>
				<Route path='*'>
					<NotFound />
				</Route>
			</Switch>
		</Layout>
	);
}

export default App;
