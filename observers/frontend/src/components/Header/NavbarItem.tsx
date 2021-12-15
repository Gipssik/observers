import React, {FC} from 'react';
import {NavLink} from "react-router-dom";

interface MenuItemProps {
	content: string;
	url: string;
}

const NavbarItem: FC<MenuItemProps> = ({content, url}) => {
	return (
		<NavLink to={url} className='header-navlink'>
			{content}
		</NavLink>
	);
};

export default NavbarItem;