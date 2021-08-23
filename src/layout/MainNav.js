import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/auth-actions';
import logo from '../logo.svg';

import classes from './MainNav.module.css';

const MainNav = (props) => {
	const isLoggedIn = useSelector((state) => state.auth.loggedIn);

  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    dispatch(logout());
  };

	return (
		<header className={classes.header}>
			<div className={classes.logo}>
				<img src={logo} alt="logo" />
			</div>
			<nav className={classes.nav}>
				<ul>
					<li>
						<NavLink to='/home' activeClassName={classes.active}>
							Home
						</NavLink>
					</li>
					{!isLoggedIn && (
						<>
							<li>
								<NavLink to='/login' activeClassName={classes.active}>
									Login
								</NavLink>
							</li>
							<li>
								<NavLink to='/signup' activeClassName={classes.active}>
									Signup
								</NavLink>
							</li>
						</>
					)}
					{isLoggedIn && (
						<li>
              <button onClick={logoutHandler} className={classes.button}>
                Logout
              </button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNav;
