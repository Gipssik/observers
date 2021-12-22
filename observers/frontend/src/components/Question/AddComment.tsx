import React, {FC, useEffect, useState} from 'react';
import {Form, Formik} from "formik";
import TextareaField from "../Fields/TextareaField";
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

interface AddCommentProps{
	questionId: number;
}

const AddComment: FC<AddCommentProps> = ({questionId}) => {
	// const [editor, setEditor] = useState();
	const user = useTypedSelector(state => state.user.user);
	const authenticated = useTypedSelector(state => state.auth.authenticated);
	const navigate = useNavigate();

	// if(editor){
	// 	// @ts-ignore
	// 	console.log(draftToHtml(convertToRaw(editor.getCurrentContent())));
	// 	// @ts-ignore
	// 	console.log(convertToRaw(editor.getCurrentContent()));
	// }

	const createComment = () => {
		if(!authenticated || !user)
			navigate('/login')

		const comment = document.querySelector<HTMLInputElement>('#comment')?.value;
		const body = {
			question_id: questionId,
			author_id: user?.id,
			content: comment
		}
		instance.post<IComment>('forum/comments/', body)
			.then(response => {
				navigate('/questions/' + questionId);
			})
	}

	return (
		<Formik
			initialValues={{
				comment: ''
			}}
			validationSchema={AddCommentSchema}
			onSubmit={() => createComment()}
		>
			{({errors, touched}) => {
				return (
					<Form className="mt-10">
						{/*<Editor*/}
						{/*	wrapperClassName="editor-wrapper"*/}
						{/*	editorClassName="editor-text"*/}
						{/*	toolbarClassName="text-primaryBg"*/}
						{/*	onEditorStateChange={(es: any) => {setEditor(es)}}*/}
						{/*/>*/}
						{/*{*/}
						{/*	editor ?*/}
						{/*		// @ts-ignore*/}
						{/*		<div dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editor.getCurrentContent()))}}></div>*/}
						{/*		:null*/}
						{/*}*/}
						<TextareaField
							content="Leave a comment"
							type="textarea"
							id="comment"
							errors={errors}
							touched={touched}/>
						<div className="mt-5 w-full">
							<SubmitButton content="Send"/>
						</div>
					</Form>
				)
			}}
		</Formik>
	);
};

export default AddComment;