import React, {FC, ReactElement, useState} from 'react';
import {Editor} from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {convertToRaw} from "draft-js";

interface EditorField{
	setState: (s: any) => void;
}

const EditorField: FC<EditorField> = ({setState}) => {

	return (
		<Editor
			wrapperClassName="editor-wrapper"
			editorClassName="editor-text"
			toolbarClassName="text-primaryBg"
			onEditorStateChange={(es: any) => {setState(es)}}
		/>
	);
};

export default EditorField;