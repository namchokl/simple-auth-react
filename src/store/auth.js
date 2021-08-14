import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		token: null,
		loggedIn: false,
		signup: null,
	},
	reducers: {
		setSignup(state, action) {
			state.signup = {
				success: action.payload.success,
				email: action.payload.email,
				message: action.payload.message,
			};
		},
		clearSignup(state, action) {
			state.signup = null;
		},
		setAuthenticated(state, action) {
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.loggedIn = true;
		},
		removeAuthenticated(state) {
			state.user = null;
			state.token = null;
			state.loggedIn = false;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice;
