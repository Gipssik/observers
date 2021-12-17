import React, {FC} from 'react';
import Logo from './Logo';
import Buttons from "./Buttons";
import Navbar from "./Navbar";

const Header: FC = () => {
	return (
		<header className='main-header'>
			<div className='header-inner'>
				<div className='flex gap-20'>
					<Logo />
					<Navbar />
				</div>

				<Buttons />
			</div>
		</header>
	);
};

export default Header;