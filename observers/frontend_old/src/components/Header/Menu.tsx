import React, {FC} from 'react';
import {IconProps} from "../../types/types";

const Menu: FC<IconProps> = ({onClick}) => {
	return (
		<div className="hidden-icon" {...(onClick && {onClick: onClick})}>
			<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
				 className="header-icon"
				 viewBox="0 0 172 172">
				<path d="M21.5,37.625v10.75h129v-10.75zM21.5,80.625v10.75h129v-10.75zM21.5,123.625v10.75h129v-10.75z"></path>
			</svg>
		</div>
	);
};

export default Menu;