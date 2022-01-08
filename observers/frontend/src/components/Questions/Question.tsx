import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {QuestionProps} from "../../types/types";
import Tags from "./Tags";

const Question: FC<QuestionProps> = ({id, title, content, views, tags}) => {
	const navigate = useNavigate();

	return (
		<div className="question-container">
			<div onClick={() => navigate(`/questions/${id}/`)} className="question-title">
				{title.slice(0, 50)}{title.length > 50 ? '...' : null}
			</div>
			<Tags tags={tags} clickable={true}/>
			<div className="question-views"><span className="font-bold">&#128065;</span> {views}</div>
		</div>
	);
};

export default Question;