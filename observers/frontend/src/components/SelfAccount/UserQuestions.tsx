import React, {FC} from 'react';
import UserQuestion from "./UserQuestion";
import {UserQuestionsProps} from "../../types/types";

const UserQuestions: FC<UserQuestionsProps> = ({questions}) => {
	return (
		<div>
			<div className="account-title">User's questions:</div>
			<div className="flex flex-col items-center gap-3 mt-5">
				{questions.map(question => <UserQuestion key={question.id} question={question}/>)}
			</div>
		</div>
	);
};

export default UserQuestions;