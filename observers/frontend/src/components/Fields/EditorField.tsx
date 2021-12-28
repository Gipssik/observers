import React, {FC, useState} from 'react';
import {Editor, EditorState} from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {convertToRaw} from "draft-js";

interface EditorField{
	setFieldValue: (val: string) => void;
}

const EditorField: FC<EditorField> = ({setFieldValue}) => {
	const [editorState, setEditorState] = useState<any>();

	const onEditorStateChange = (editorState: EditorState) => {
		const forFormik = draftToHtml(
			convertToRaw(editorState.getCurrentContent())
		);
		setFieldValue(forFormik);
		setEditorState(editorState);
	}

	return (
		<Editor
			wrapperClassName="editor-wrapper"
			editorClassName="editor-text"
			toolbarClassName="text-primaryBg"
			onEditorStateChange={onEditorStateChange}
		/>
	);
};

export default EditorField;