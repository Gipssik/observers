import React, {FC} from 'react';

interface RegularButtonProps {
	content: string;
	onClick: () => void;
	className: string;
}

const RegularButton: FC<RegularButtonProps> = ({content, onClick, className}) => {
	return (
		<div onClick={onClick} className={"submit-button " + className}>
			{content}
		</div>
	);
};

export default RegularButton;