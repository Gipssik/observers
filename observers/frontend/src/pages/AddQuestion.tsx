import React, {FC} from 'react';
import AddQuestionForm from "../components/AddQuestion/AddQuestionForm";

const AddQuestion: FC = () => {
	return (
		<div className="add-question-container">
			<AddQuestionForm/>
		</div>
	);
};

export default AddQuestion;