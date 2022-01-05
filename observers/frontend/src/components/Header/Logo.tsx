import React, {FC} from 'react';
import {NavLink} from "react-router-dom";

interface LogoProps{
	className?: string;
}

const Logo: FC<LogoProps> = ({className}) => {
	return (
		<NavLink to='/' className={"logo " + (className ? className : "")}>
            <span className='text-primaryTxt not-italic'>Ob</span>servers
		</NavLink>
	);
};

export default Logo;