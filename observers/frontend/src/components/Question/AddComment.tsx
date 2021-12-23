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
import EditorField from "../Fields/EditorField";

interface AddCommentProps{
	questionId: number;
}

const AddComment: FC<AddCommentProps> = ({questionId}) => {
	const [editor, setEditor] = useState();
	const [errors, setErrors] = useState('');
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

		// @ts-ignore
		const comment = draftToHtml(convertToRaw(editor.getCurrentContent()));
		if(comment.replaceAll(/<p>(&nbsp;)*<\/p>/ig, '').length > 32 + 8){
			setErrors('');
			const body = {
				question_id: questionId,
				author_id: user?.id,
				content: comment
			}
			instance.post<IComment>('forum/comments/', body)
				.then(response => {
					window.location.reload();
				})
		}else{
			setErrors('Comment\'s content must be at least 32 character long');
		}

	}

	return (
		<div>
			<div>
				<EditorField setState={setEditor}/>
				{
					errors ?
						<div className="field-error">{errors}</div>
						:
						null
				}

			</div>
			<div className="mt-5 w-full">
				<SubmitButton onClick={createComment} content="Send"/>
			</div>
			{/*{*/}
			{/*	editor ?*/}
			{/*		// @ts-ignore*/}
			{/*		<div dangerouslySetInnerHTML={{__html: ta.value}}></div>*/}
			{/*		:null*/}
			{/*}*/}
		</div>
	);
};

export default AddComment;