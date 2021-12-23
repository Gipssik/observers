import React from 'react';
import {NavLink} from "react-router-dom";

const Logo = () => {
	return (
		<NavLink to='/' className='logo'>
            <span className='text-primaryTxt not-italic'>Ob</span>servers
		</NavLink>
	);
};

export default Logo;