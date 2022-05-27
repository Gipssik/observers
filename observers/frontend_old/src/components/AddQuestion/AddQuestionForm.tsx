import React, {FC} from 'react';
import {AddQuestionSchema} from "../../forms/forms";
import {useFormik} from "formik";
import SubmitButton from "../Buttons/SubmitButton";
import CreationField from "../Fields/CreationField";
import EditorField from "../Fields/EditorField";
import Preview from "../Preview/Preview";
import {AddQuestionFormProps} from "../../types/types";

const AddQuestionForm: FC<AddQuestionFormProps> = ({
	   title,
	   tags,
	   content,
	   buttonText,
	   onSubmit
}) => {

	const submit = () => {
		const title: string = formik.values.title;
		const tags: string[] = Array.from(
			new Set(formik.values.tags
				.replaceAll(/\s+/g, " ")
				.split(" ")
				.filter(element => element !== ''))
		);
		const content: string = formik.values.content;

		let body: any = {title, content};

		if(tags.length > 0){
			body.tags = tags;
		}

		onSubmit(body)
	}

	const formik = useFormik({
		initialValues: {
			title: title ? title : "",
			tags: tags ? tags.join(" ") : "",
			content: content ? content : ""
		},
		onSubmit: submit,
		validationSchema: AddQuestionSchema
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
				<CreationField
					content={"tags (separated with \" \") "}
					type="text"
					id="tags"
					errors={formik.errors.tags}
					handleChange={formik.handleChange}
					value={tags ? tags.join(" ") : ""}
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
					<SubmitButton content={buttonText ? buttonText : "Ask"}/>
				</div>
			</form>
		</div>
	);
};

export default AddQuestionForm;