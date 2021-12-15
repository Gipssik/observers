import React, {FC} from 'react';
import {NavLink} from "react-router-dom";

interface HeaderButtonProps {
	content: string;
	url: string;
}

const HeaderButton: FC<HeaderButtonProps> = ({content, url}) => {
	return (
		<NavLink to={url} className='header-button'>
			{content}
		</NavLink>
	);
};

export default HeaderButton;
