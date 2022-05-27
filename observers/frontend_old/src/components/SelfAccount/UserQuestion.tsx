import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {UserQuestionProps} from "../../types/types";

const UserQuestion: FC<UserQuestionProps> = ({question}) => {
	const navigate = useNavigate();

	return (
		<div className="account-question" onClick={() => navigate('/questions/' + question.id)}>
			{question.title.slice(0, 35) + (question.title.length > 35 ? '...' : '')}
		</div>
	);
};

export default UserQuestion;