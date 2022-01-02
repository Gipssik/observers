import React, {FC} from 'react';
import {IQuestion} from "../../types/types";
import {useNavigate} from "react-router-dom";

interface UserQuestionProps{
	question: IQuestion;
}

const UserQuestion: FC<UserQuestionProps> = ({question}) => {
	const navigate = useNavigate();

	return (
		<div className="account-question" onClick={() => navigate('/questions/' + question.id)}>
			{question.title.slice(0, 35) + (question.title.length > 35 ? '...' : '')}
		</div>
	);
};

export default UserQuestion;