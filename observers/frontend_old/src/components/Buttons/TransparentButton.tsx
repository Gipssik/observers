import React, {FC} from 'react';
import {RegularButtonProps} from "../../types/types";

const TransparentButton: FC<RegularButtonProps> = ({content, onClick, className}) => {
	return (
		<div onClick={onClick} className={"header-button " + className}>
			{content}
		</div>
	);
};

export default TransparentButton;