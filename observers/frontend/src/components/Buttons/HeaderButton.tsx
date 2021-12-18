import React, {FC} from 'react';
import {NavLink} from "react-router-dom";

interface HeaderButtonProps {
	content: string;
	url: string;
	onClick?: () => void;
}

const HeaderButton: FC<HeaderButtonProps> = ({content, url, onClick}) => {

	return (
		<NavLink to={url} className='header-button' onClick={onClick}>
			{content}
		</NavLink>
	);
};

export default HeaderButton;
