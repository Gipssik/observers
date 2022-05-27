import React, {FC} from 'react';
import {AddArticleFormProps} from "../../types/types";
import {useFormik} from "formik";
import {AddArticleSchema} from "../../forms/forms";
import CreationField from "../Fields/CreationField";
import EditorField from "../Fields/EditorField";
import Preview from "../Preview/Preview";
import SubmitButton from "../Buttons/SubmitButton";

const AddArticleForm: FC<AddArticleFormProps> = ({
	 title,
	 content,
	 buttonText,
	 onSubmit
}) => {

	const submit = () => {
		const title: string = formik.values.title;
		const content: string = formik.values.content;
		const body = {title, content};

		onSubmit(body);
	}

	const formik = useFormik({
		initialValues: {
			title: title ? title : "",
			content: content ? content : ""
		},
		onSubmit: submit,
		validationSchema: AddArticleSchema
	})

	return (
		<div>
			<form onSubmit={formik.handleSubmit} className="form">
				<CreationField
					content="title"
					id="title"
					type="text"
					errors={formik.errors.title}
					handleChange={formik.handleChange}
					value={title ? title : ""}
				/>
				<div className="creation-field-container mb-3">
					<span className="creation-label">Content:</span>
					<EditorField
						setFieldValue={(val => {formik.setFieldValue("content", val)})}
						{...(content && {value: content})}
					/>
					{
						formik.errors.content ?
							<div className="field-error bottom-0 translate-y-[100%]">{formik.errors.content}</div>
							:
							null
					}
				</div>
				{
					formik.values.content ?
						<Preview content={formik.values.content}/>
						:
						null
				}
				<div className="mx-auto">
					<SubmitButton content={buttonText ? buttonText : "Create"}/>
				</div>
			</form>
		</div>
	);
};

export default AddArticleForm;