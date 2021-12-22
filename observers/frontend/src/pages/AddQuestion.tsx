import React, {FC, useEffect} from 'react';
import AddQuestionForm from "../components/AddQuestion/AddQuestionForm";
import {useTypedSelector} from "../hooks/useTypesSelector";
import {useNavigate} from "react-router-dom";

const AddQuestion: FC = () => {
	const authenticated = useTypedSelector(state => state.auth.authenticated);
	const navigate = useNavigate();

	useEffect(() => {
		if(!authenticated){
			navigate('/login');
		}
	}, [authenticated]);

	return (
		<div className="add-question-container">
			<AddQuestionForm/>
		</div>
	);
};

export default AddQuestion;