import { useState, useEffect } from 'react';

import style from './EditableBox.module.css';

import DOMPurify from 'dompurify';
var config = {
  ALLOWED_TAGS: ['#text'], // only <P> and text nodes
};

const EditableBox = (props) => {
	const initData = props.dataKey ? props.data[props.dataKey] : props.data;
	console.log('initData', initData);
	const [data, setData] = useState(initData);

	const onBlurHandler = (e) => {
		console.log('onBlur: ', e.target.innerHTML);
		const org = e.target.innerHTML;
		const newHTML = DOMPurify.sanitize(org, config);
		const newValue = newHTML;
		// setData( newValue );
		console.log('onBlur-2: ', newValue);
		props.onUpdate([props.dataKey], newValue);
	};

	const onKeyDown = (e) => {
		// console.log(e.target.innerHTML)
		if( e.keyCode === 13 ) {
			// prevent 'new line'
			e.preventDefault();
		}
	};

	const onFocus = (e) => {
		console.log('onFocus..');
		console.log(e.target);

		const selection = window.getSelection();  
		const range = document.createRange();
		range.selectNodeContents(e.target);
		selection.removeAllRanges();
		selection.addRange(range);
	}

	let classes
	if( data === '') {
		classes = [style.editBox, style.empty, props.className].join(' ');
	} else {
		classes = [style.editBox, props.className].join(' ');
	}

	useEffect(() => {
		console.log();
		if( data !== '' ) {
			classes = ['editable-box', style.editBox, props.className].join(' ');
		} else {
			classes = ['editable-box', style.editBox, style.empty, props.className].join(' ');
		}
	}, [data])

	return (
		<>
			{props.type === 'span' && (
				<span
					data-key={props.dataKey}
					className={classes}
					contentEditable={props.editMode}
					onBlur={onBlurHandler}
					onKeyDown={onKeyDown}
					onFocus={onFocus}
					onKeyPress={(e)=>{console.log(e.target.innerHTML);}}
				>
					{data === '' && props.placeHolder}
					{data !== '' && data}
				</span>
			)}
			{props.type === 'div' && (
				<div
					className={classes}
					contentEditable={props.editMode}
					onBlur={onBlurHandler}
					onKeyDown={onKeyDown}
				>
					{data === '' && props.placeHolder}
					{data !== '' && data}
				</div>
			)}
		</>
	);
};

export default EditableBox;
