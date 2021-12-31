import React, {FC, useState} from 'react';
import {Editor} from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {ContentState, EditorState, convertFromHTML, convertToRaw} from "draft-js";

interface EditorField{
	setFieldValue: (val: string) => void;
	value?: string;
	onBlur?: () => void;
}

const EditorField: FC<EditorField> = ({setFieldValue, value, onBlur}) => {
	const [editorState, setEditorState] = useState<any>();
	const editorDefaultState = value ?
		// @ts-ignore
		EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(value)))
		:
		null;

	const onEditorStateChange = (editorState: EditorState) => {
		const forFormik = draftToHtml(
			convertToRaw(editorState.getCurrentContent())
		);
		setFieldValue(forFormik);
		setEditorState(editorState);
	}

	return (
		<Editor
			onBlur={onBlur}
			wrapperClassName="editor-wrapper"
			editorClassName="editor-text"
			toolbarClassName="text-primaryBg"
			onEditorStateChange={onEditorStateChange}
			{...(editorDefaultState && {defaultEditorState: editorDefaultState})}
		/>
	);
};

export default EditorField;