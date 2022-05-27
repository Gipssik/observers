import React, {FC} from 'react';
import {RegularButtonProps} from "../../types/types";

const RegularButton: FC<RegularButtonProps> = ({content, onClick, className}) => {
	return (
		<div onClick={onClick} className={"submit-button " + className}>
			{content}
		</div>
	);
};

export default RegularButton;