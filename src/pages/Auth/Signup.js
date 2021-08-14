import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../store/auth-actions';
import { authActions } from '../../store/auth';

import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import { required, length, email } from '../../util/validators';
import Auth from './Auth';

const Signup = (props) => {
	const [signupForm, setSignupForm] = useState({
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
			},
			name: {
				value: '',
				valid: false,
				touched: false,
				validators: [required],
			},
		},
		formIsValid: false,
	});

	const history = useHistory();

	const signupStatus = useSelector(state => state.auth.signup);

	useEffect(() => {
		if(signupStatus && signupStatus.success === true) {
			console.log('redirect to Login page...');
			history.replace('/login');
		}
	}, [signupStatus]);

	const dispatch = useDispatch();

	const onSignupHandler = (e, signupForm) => {
		console.log('onSignupHandler...');
		e.preventDefault();

		const { email, name, password } = signupForm.inputs;
		// console.log(signupForm.inputs);

		dispatch(
			signup({ 
				email: email.value, 
				name: name.value, 
				password: password.value })
		);
	};

	const inputChangeHandler = (input, value) => {
		setSignupForm((prevState) => {
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
		setSignupForm((prevState) => {
			return {
				inputs: {
					...prevState.inputs,
					[input]: {
						...prevState.inputs[input],
						touched: true,
					},
				},
				formIsValid: prevState.formIsValid,
			};
		});
	};

	return (
		<Auth>
			<form onSubmit={(e) => onSignupHandler(e, signupForm)}>
				<Input
					id='email'
					label='Your E-Mail'
					type='email'
					control='input'
					onChange={inputChangeHandler}
					onBlur={inputBlurHandler.bind(null, 'email')}
					value={signupForm.inputs['email'].value}
					valid={signupForm.inputs['email'].valid}
					touched={signupForm.inputs['email'].touched}
				/>
				<Input
					id='name'
					label='Your Name'
					type='text'
					control='input'
					onChange={inputChangeHandler}
					onBlur={inputBlurHandler.bind(null, 'name')}
					value={signupForm.inputs['name'].value}
					valid={signupForm.inputs['name'].valid}
					touched={signupForm.inputs['name'].touched}
				/>
				<Input
					id='password'
					label='Password'
					type='password'
					control='input'
					onChange={inputChangeHandler}
					onBlur={inputBlurHandler.bind(null, 'password')}
					value={signupForm.inputs['password'].value}
					valid={signupForm.inputs['password'].valid}
					touched={signupForm.inputs['password'].touched}
				/>
				<Button design='raised' type='submit' loading={props.loading}>
					Signup
				</Button>
			</form>
		</Auth>
	);
};

export default Signup;
