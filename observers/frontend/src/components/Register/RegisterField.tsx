import React, {FC} from 'react';

interface RegisterFieldProps{
	content: string;
	type: string;
	id: string;
}

const RegisterField: FC<RegisterFieldProps> = ({content, type, id}) => {
	return (
		<div className='flex flex-col gap-3 w-full'>
			<label className='text-primaryTxt text-lg' htmlFor={id}>{content.charAt(0).toUpperCase() + content.slice(1)}:</label>
			<input className='bg-transparent text-primaryTxt border-2 border-secondaryTxt rounded-md px-4 py-2 focus:outline-none' type={type} id={id} name={id}/>
		</div>
	);
};

export default RegisterField;