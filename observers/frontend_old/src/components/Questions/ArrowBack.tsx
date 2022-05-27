import React, {FC} from 'react';
import {ArrowBackProps} from "../../types/types";

const ArrowBack: FC<ArrowBackProps> = ({onClick}) => {
	return (
		<div onClick={onClick} className="arrow-back group">
			<div className="arrow-top"></div>
			<div className="arrow-mid"></div>
			<div className="arrow-bot"></div>
		</div>
	);
};

export default ArrowBack;