import React, {FC} from 'react';

interface ExProps{
	onClick: () => void;
}

const Ex: FC<ExProps> = ({onClick}) => {
	return (
		<div className="ex" onClick={onClick}>
			<span className="ex-1"></span>
			<span className="ex-2"></span>
		</div>
	);
};

export default Ex;