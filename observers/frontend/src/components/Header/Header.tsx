import React, {FC} from 'react';
import Logo from './Logo';
import Navbar from "./Navbar";

const Header: FC = () => {
	return (
		<header className='main-header'>
			<div className='header-inner'>
				<Logo />
				<Navbar />
			</div>
		</header>
	);
};

export default Header;