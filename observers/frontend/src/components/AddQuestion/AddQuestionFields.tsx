import React, {FC, useState} from 'react';
import CreationField from "../Fields/CreationField";
import {AddQuestionFieldsProps} from "../../types/types";
import EditorField from "../Fields/EditorField";

const AddQuestionFields: FC<AddQuestionFieldsProps> = ({
	   errors,
	   touched,
	   setEditor,
	   editorErrors
}) => {
	return (
		<div className="form">

		</div>
	);
};

export default AddQuestionFields;