import React, {FC} from 'react';

interface QuestionProps{
	title: string;
	content: string;
	views: number;
}

const Question: FC<QuestionProps> = ({title, content, views}) => {
	return (
		<div className="question-container group">
			<div className="question-title">
				{title.slice(0, 50)}{title.length > 50 ? '...' : null}
			</div>
			<div className="mt-3 ml-3">
				{content.replaceAll('\n', '   ').slice(0, 100)}{content.length > 100 ? '...' : null}
			</div>
			<div className="question-views">&#128065; {views}</div>
		</div>
	);
};

export default Question;