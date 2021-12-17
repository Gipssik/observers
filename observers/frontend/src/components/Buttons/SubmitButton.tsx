import React, {FC} from 'react';

interface SubmitButtonProps{
	content: string;
}

const SubmitButton: FC<SubmitButtonProps> = ({content}) => {
	return (
		<button type="submit" className="submit-button">
			{content}
		</button>
	);
};

export default SubmitButton;