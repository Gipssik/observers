import React, {FC} from 'react';

interface SubmitButtonProps{
	content: string;
	onClick: () => any;
}

const SubmitButton: FC<SubmitButtonProps> = ({content, onClick}) => {
	return (
		<div onClick={onClick} className='w-32 text-center text-primaryBg capitalize rounded-md px-6 py-2 transition-all bg-primaryTxt hover:opacity-70 hover:cursor-pointer'>
			{content}
		</div>
	);
};

export default SubmitButton;