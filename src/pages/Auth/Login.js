import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/auth-actions';

import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import { required, length, email } from '../../util/validators';
import Auth from './Auth';
import { authActions } from '../../store/auth';

const Login = (props) => {
	const [loginForm, setLoginForm] = useState({
    inputs: {
      email: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, email],
      },
      password: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, length({ min: 5 })],
      }
    },
		formIsValid: false,
	});

	const signupStatus = useSelector(state => state.auth.signup);

	const isLoggedIn = useSelector(state => state.auth.loggedIn);

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if(isLoggedIn) {
			history.replace('/');
		}

		if(signupStatus && signupStatus.success) {
			const signupEmail = signupStatus.email;
			setLoginForm(prevState => {
				const updatedInputs = { 
					...prevState.inputs,
					email: {
						...prevState.inputs.email,
						value: signupEmail
					}
				 };
				 return {
					inputs: updatedInputs,
					formIsValid: prevState.formIsValid,
				 };

			});
			dispatch(authActions.clearSignup());

		}
	}, [isLoggedIn, dispatch, history, signupStatus]);

	const onLoginHandler = (e, loginData) => {
    console.log('onLoginHandler...')
    e.preventDefault();

		dispatch(
			login( loginData)
		);
	};

	const inputChangeHandler = (input, value) => {
		setLoginForm((prevState) => {
			let isValid = true;
			for (const validator of prevState.inputs[input].validators) {
				isValid = isValid && validator(value);
			}
			const updatedInputs = {
				...prevState.inputs,
				[input]: {
					...prevState.inputs[input],
					valid: isValid,
					value: value,
				},
			};
			let formIsValid = true;
			for (const inputName in updatedInputs) {
				formIsValid = formIsValid && updatedInputs[inputName].valid;
			}
			return {
				inputs: updatedInputs,
				formIsValid: formIsValid,
			};
		});
	};

	const inputBlurHandler = (input) => {
		setLoginForm((prevState) => {
			return {
				inputs: {
					...prevState.inputs,
					[input]: {
						...prevState.inputs[input],
						touched: true,
					},
				},
        formIsValid: prevState.formIsValid
			};
		});
	};

	return (
		<Auth>
			<form
				onSubmit={(e) =>
					onLoginHandler(e, {
						email: loginForm.inputs.email.value.toLowerCase(),
						password: loginForm.inputs.password.value,
					})
				}
			>
				<Input
					id='email'
					label='Your E-Mail'
					type='email'
					control='input'
					onChange={inputChangeHandler}
					onBlur={inputBlurHandler.bind(this, 'email')}
					value={loginForm.inputs['email'].value}
					valid={loginForm.inputs['email'].valid}
					touched={loginForm.inputs['email'].touched}
				/>
				<Input
					id='password'
					label='Password'
					type='password'
					control='input'
					onChange={inputChangeHandler}
					onBlur={inputBlurHandler.bind(this, 'password')}
					value={loginForm.inputs['password'].value}
					valid={loginForm.inputs['password'].valid}
					touched={loginForm.inputs['password'].touched}
				/>
				<Button design='raised' type='submit' loading={props.loading}>
					Login
				</Button>
			</form>
		</Auth>
	);
};

export default Login;
