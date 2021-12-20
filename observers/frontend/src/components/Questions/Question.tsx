import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {QuestionProps} from "../../types/types";

const Question: FC<QuestionProps> = ({id, title, content, views}) => {
	const navigate = useNavigate();

	return (
		<div onClick={() => navigate('/questions/' + id)} className="question-container group">
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