import React, {FC, useState} from 'react';
import {AddQuestionSchema} from "../../forms/forms";
import {Form, Formik, useFormik} from "formik";
import SubmitButton from "../Buttons/SubmitButton";
import AddQuestionFields from "./AddQuestionFields";
import {instance} from "../../Instance";
import {IComment, IQuestion} from "../../types/types";
import {useNavigate} from "react-router-dom";
import CreationField from "../Fields/CreationField";
import EditorField from "../Fields/EditorField";
import Preview from "../Preview/Preview";

const AddQuestionForm: FC = () => {
	const navigate = useNavigate();

	const createQuestion = () => {
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

		instance.post<IQuestion>('forum/questions/', body)
			.then(response => {
				navigate('/questions');
			});
	}

	const formik = useFormik({
		initialValues: { title: "", tags: "", content: "" },
		onSubmit: createQuestion,
		validationSchema: AddQuestionSchema
	})

	return (
		<div>
			<form onSubmit={formik.handleSubmit} className="form">
				<h1 className="register-title">Ask Question</h1>
				<CreationField
					content="title"
					id="title"
					type="text"
					errors={formik.errors.title}
					handleChange={formik.handleChange}
				/>
				<CreationField
					content={"tags (separated with \" \") "}
					type="text"
					id="tags"
					errors={formik.errors.tags}
					handleChange={formik.handleChange}
				/>
				<div className="creation-field-container mb-3">
					<span className="creation-label">Content:</span>
					<EditorField setFieldValue={(val => {formik.setFieldValue("content", val)})}/>
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
					<SubmitButton content="Ask"/>
				</div>
			</form>
		</div>
	);
};

export default AddQuestionForm;