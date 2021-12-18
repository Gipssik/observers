import React, {FC} from 'react';
import NavbarItem from "./NavbarItem";
import Search from "./Search";

const Navbar: FC = () => {
	return (
		<nav className='flex gap-10 items-center'>
			<NavbarItem content='questions' url='/questions'/>
			<NavbarItem content='news' url='/news'/>
			<Search />
		</nav>
	);
};

export default Navbar;