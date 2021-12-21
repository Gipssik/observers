import React, {FC} from 'react';
import CreationField from "../Fields/CreationField";
import TextareaField from "../Fields/TextareaField";
import {AddQuestionFieldsProps} from "../../types/types";

const AddQuestionFields: FC<AddQuestionFieldsProps> = ({errors, touched}) => {
	return (
		<div className="form">
			<CreationField
				content="title"
				type="text"
				id="title"
				errors={errors.username}
				touched={touched.username}
			/>
			<TextareaField
				content="content"
				type="textarea"
				id="content"
				errors={errors.password}
				touched={touched.password}
			/>
		</div>
	);
};

export default AddQuestionFields;