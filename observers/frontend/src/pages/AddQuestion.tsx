import React, {FC, useEffect} from 'react';
import AddQuestionForm from "../components/AddQuestion/AddQuestionForm";
import {useTypedSelector} from "../hooks/useTypesSelector";
import {useNavigate} from "react-router-dom";
import {instance} from "../Instance";
import {IQuestion} from "../types/types";

const AddQuestion: FC = () => {
	const authenticated = useTypedSelector(state => state.auth.authenticated);

	const navigate = useNavigate();

	const createQuestion = (body: any) => {
		instance.post<IQuestion>('forum/questions/', body)
			.then(response => {
				navigate('/questions');
			});
	}

	useEffect(() => {
		if(!authenticated){
			navigate('/login');
		}
	}, [authenticated]);

	return (
		<div className="add-question-container">
			<h1 className="register-title">Ask Question</h1>
			<AddQuestionForm onSubmit={createQuestion}/>
		</div>
	);
};

export default AddQuestion;