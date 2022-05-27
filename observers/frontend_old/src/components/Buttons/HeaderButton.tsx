import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import {HeaderButtonProps} from "../../types/types";


const HeaderButton: FC<HeaderButtonProps> = ({content, url, onClick}) => {

	return (
		<NavLink to={url} className='header-button' onClick={onClick}>
			{content}
		</NavLink>
	);
};

export default HeaderButton;
