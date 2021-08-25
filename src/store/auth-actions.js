import { authActions } from './auth';
import { notify } from './ui-notifyActions';

import { SERVER_URL } from '../setting';

export const login = (authData) => {
	return async (dispatch) => {
		dispatch(
			notify({
				status: 'pending',
				title: 'Login',
				message: 'Verifying..',
			})
		);

		try {
			const response = await fetch(SERVER_URL + '/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(authData),
			});

			if (response.status !== 200) {
				throw new Error('Authentication failed');
			}

			const resData = await response.json();

			localStorage.setItem('token', resData.token);
			localStorage.setItem('user', JSON.stringify(resData.user));

			dispatch(authActions.setAuthenticated(resData));
      dispatch(
				notify({
					status: 'success',
					title: 'Login success.',
					message: '',
				})
			);
		} catch (err) {
			dispatch(
				notify({
					status: 'error',
					title: 'Login failed',
					message: err.message,
				})
			);
		}
	};
};

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem('token');
		localStorage.removeItem('user');

    dispatch(authActions.removeAuthenticated());
  };
};

export const signup = (authData) => {
	return async (dispatch) => {
		dispatch(
			notify({
				status: 'pending',
				title: 'Signup',
				message: 'Pending..',
			})
		);

		try {
			const response = await fetch(SERVER_URL + '/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(authData),
			});

			const resData = await response.json();

			if (!response.ok) {
				let message = 'Signup failed.';
				if (resData.data) {
					message = resData.data[0].msg;
				}
				throw new Error(message);
			}

      dispatch( authActions.setSignup({
        success: true,
        email: resData.user.email,
        message: ''
      }));

			dispatch(
				notify({
					status: 'success',
					title: 'Signup successfully.',
					message: 'Please, login.',
				})
			);
		} catch (err) {
			dispatch(
				notify({
					status: 'error',
					title: 'Signup failed',
					message: err.message,
				})
			);
		}
	};
};
