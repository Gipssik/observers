import React, {FC} from 'react';
import {IQuestion} from "../../types/types";
import UserQuestion from "./UserQuestion";

interface UserQuestionsProps{
	questions: IQuestion[];
}

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