import { useSelector } from 'react-redux';

import classes from './Layout.module.css';

import MainNav from './MainNav';
import Notification from '../components/UI/Notification';

const Layour = (props) => {
	const notification = useSelector((state) => state.ui.notification);

	return (
		<>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<MainNav />
			<main className={classes.main}>{props.children}</main>
		</>
	);
};

export default Layour;
