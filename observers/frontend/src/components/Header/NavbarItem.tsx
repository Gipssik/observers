import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import {MenuItemProps} from "../../types/types";

const NavbarItem: FC<MenuItemProps> = ({content, url}) => {
	return (
		<NavLink to={url} className='header-navlink'>
			{content}
		</NavLink>
	);
};

export default NavbarItem;