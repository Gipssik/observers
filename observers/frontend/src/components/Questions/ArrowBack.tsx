import React, {FC} from 'react';

interface ArrowBackProps{
	onClick: () => void;
}

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