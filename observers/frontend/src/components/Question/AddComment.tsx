import React, {FC, useEffect, useState} from 'react';
import {Form, Formik, useFormik} from "formik";
import {AddCommentSchema} from "../../forms/forms";
import SubmitButton from "../Buttons/SubmitButton";
import {instance} from "../../Instance";
import {IComment} from "../../types/types";
import {useTypedSelector} from "../../hooks/useTypesSelector";
import {useNavigate} from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {convertFromRaw, convertToRaw} from "draft-js";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EditorField from "../Fields/EditorField";
import Preview from "../Preview/Preview";

interface AddCommentProps{
	questionId: number;
}

const AddComment: FC<AddCommentProps> = ({questionId}) => {
	const user = useTypedSelector(state => state.user.user);
	const authenticated = useTypedSelector(state => state.auth.authenticated);
	const navigate = useNavigate();

	const createComment = () => {
		if(!authenticated || !user)
			navigate('/login')

		const body = {
			question_id: questionId,
			author_id: user?.id,
			content: formik.values.comment
		}
		instance.post<IComment>('forum/comments/', body)
			.then(response => {
				window.location.reload();
			})

	}

	const formik = useFormik({
		initialValues: { comment: "" },
		onSubmit: createComment,
		validationSchema: AddCommentSchema
	})

	return (
		<div className="mt-5">
			<h2 className="mb-2">Add a comment:</h2>
			<form onSubmit={formik.handleSubmit} className="form">
				<div>
					<EditorField setFieldValue={(val => {formik.setFieldValue("comment", val)})}/>
					{
						formik.errors.comment ?
							<div className="field-error">{formik.errors.comment}</div>
							:
							null
					}
				</div>
				{
					formik.values.comment ?
						<Preview content={formik.values.comment}/>
						:
						null
				}
				<div className="mt-8 w-full">
					<SubmitButton onClick={() => {}} content="Send"/>
				</div>
			</form>
		</div>
	);
};

export default AddComment;