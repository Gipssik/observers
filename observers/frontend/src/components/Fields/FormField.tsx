import {Field} from 'formik';
import React, {FC} from 'react';

interface RegisterFieldProps{
	content: string;
	type: string;
	id: string;
	errors: any;
	touched: any;
}

const FormField: FC<RegisterFieldProps> = ({content, type, id, errors, touched}) => {
	return (
		<div className="flex flex-col gap-2">
			<label className="text-primaryTxt text-lg" htmlFor={id}>
				{content.charAt(0).toUpperCase() + content.slice(1)}:
			</label>
			<div>
				<Field name={id} id={id} type={type} className="field"/>
				{errors && touched ? (
					<div className="absolute text-red-500 text-sm">{errors}</div>
				) : null}
			</div>
		</div>
	);
};

export default FormField;