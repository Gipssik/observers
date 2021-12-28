import React, {FC} from 'react';

interface PreviewProps{
	content: string
}

const Preview: FC<PreviewProps> = ({content}) => {
	return (
		<div>
			<span className="creation-label">Preview:</span>
			<div
				className="preview-container"
			>
				<div dangerouslySetInnerHTML={{__html: content}}></div>
			</div>
		</div>
	);
};

export default Preview;