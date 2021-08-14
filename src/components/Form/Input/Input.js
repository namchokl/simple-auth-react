import React from 'react';

import classes from './Input.module.css';
// import './Input.css';

const input = (props) => {
  const classNames = [
    props.valid ? classes.valid : classes.invalid,
    props.touched ? classes.touched : classes.untouched,
  ].join(' ');

	return (
		<div className={classes.input}>
			{props.label && <label htmlFor={props.id}>{props.label}</label>}
			{props.control === 'input' && (
				<input
					className={classNames}
					type={props.type}
					id={props.id}
					required={props.required}
					value={props.value}
					placeholder={props.placeholder}
					onChange={(e) =>
						props.onChange(props.id, e.target.value, e.target.files)
					}
					onBlur={props.onBlur}
				/>
			)}
			{props.control === 'textarea' && (
				<textarea
					className={classNames}
					id={props.id}
					rows={props.rows}
					required={props.required}
					value={props.value}
					onChange={(e) => props.onChange(props.id, e.target.value)}
					onBlur={props.onBlur}
				/>
			)}
		</div>
	);
};

export default input;
