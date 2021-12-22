import React, {FC} from 'react';
import {Field} from "formik";
import {RegisterFieldProps} from "../../types/types";

const TextareaField: FC<RegisterFieldProps> = ({content, id, errors, touched}) => {
	return (
		<div className="textarea-container">
			<label className="textarea-label" htmlFor={id}>
				{content.charAt(0).toUpperCase() + content.slice(1)}:
			</label>
			<div className="options-container">
				<Field name={id}>
					{/*@ts-ignore*/}
					{({field, form, meta}) => (
						<div className="textarea-field-container">
							<textarea {...field} id={id} className="textarea-field"></textarea>
							{meta.touched && meta.error && (
								<div className="textarea-errors">{meta.error}</div>
							)}
						</div>
					)}
				</Field>
			</div>
		</div>
	);
};

export default TextareaField;