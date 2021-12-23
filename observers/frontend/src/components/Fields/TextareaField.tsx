import React, {FC} from 'react';
import {Field} from "formik";
import {RegisterFieldProps} from "../../types/types";
import {Editor} from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {convertToRaw} from "draft-js";
import EditorField from "./EditorField";

const TextareaField: FC<RegisterFieldProps> = ({content, id, errors, touched}) => {

	return (
		<div className="textarea-container">
			<label className="textarea-label" htmlFor={id}>
				{content.charAt(0).toUpperCase() + content.slice(1)}:
			</label>
			<div className="options-container">
				<Field name={id}>
					{/*{({field, form, meta}: any) => (*/}
					{/*	<div className="textarea-field-container">*/}
					{/*		<EditorField field={field} id={id}/>*/}
					{/*		{meta.touched && meta.error && (*/}
					{/*			<div className="textarea-errors">{meta.error}</div>*/}
					{/*		)}*/}
					{/*	</div>*/}
					{/*)}*/}
				</Field>
			</div>
		</div>
	);
};

export default TextareaField;