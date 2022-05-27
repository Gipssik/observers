import React, {FC} from 'react';
import {RegisterFieldProps} from "../../types/types";

const CreationField: FC<RegisterFieldProps> = ({
	   content,
	   type,
	   id,
	   errors,
	   handleChange,
	   value
}) => {
	return (
		<div className="creation-field-container">
			<label htmlFor={id} className="creation-label">{content.charAt(0).toUpperCase() + content.slice(1)}:</label>
			<input
				id={id}
				type={type}
				name={id}
				onChange={handleChange}
				className="field w-full"
				placeholder={content.charAt(0).toUpperCase() + content.slice(1)}
				defaultValue={value ? value : ""}
			/>
			{
				errors ?
					<div className="field-error bottom-0 translate-y-[100%]">{errors}</div>
					:
					null
			}
		</div>
	);
};

export default CreationField;