import React, {FC} from 'react';
import {ExProps} from "../../types/types";

const Ex: FC<ExProps> = ({onClick}) => {
	return (
		<div className="ex" onClick={onClick}>
			<span className="ex-1"></span>
			<span className="ex-2"></span>
		</div>
	);
};

export default Ex;