import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypesSelector";
import {useDispatch} from "react-redux";
import Loader from "../Loader/Loader";
import Table from "./Table";
import {fetchQuestions} from "../../store/action-creators/questions";
import {AdminActionTypes, IQuestion} from "../../types/types";
import {useNavigate} from "react-router-dom";
import {instance} from "../../Instance";

const Questions: FC = () => {
	const {questions, loading, error} = useTypedSelector(state => state.questions);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onEdit = (question: IQuestion) => {
		navigate(`/questions/${question.id}/edit`);
	}

	const onDelete = (question: IQuestion) => {
		const onConfirm = () => {
			instance.delete(`forum/questions/${question.id}/`)
				.then(response => {
					dispatch(fetchQuestions('order_by_date=desc'));
					dispatch({type: AdminActionTypes.SET_MODAL_SHOW, payload: false});
				})
				.catch(error => {
					dispatch({type: AdminActionTypes.SET_MODAL_SHOW, payload: false});
				})
		}

		dispatch({type: AdminActionTypes.SET_MODAL_CONTENT, payload: "Are you sure you want to delete this question?"});
		dispatch({type: AdminActionTypes.SET_MODAL_TYPE, payload: "confirm"});
		dispatch({type: AdminActionTypes.SET_MODAL_SHOW, payload: true});
		dispatch({type: AdminActionTypes.SET_MODAL_ON_CONFIRM, payload: onConfirm});
	}

	useEffect(() => {
		if(!questions)
			dispatch(fetchQuestions('order_by_date=desc'));
	}, []);

	return (
		<>
			{
				loading ?
					<Loader/>
					:
					(questions ? <Table onEdit={onEdit} onDelete={onDelete} objectArray={questions}/> : null)
			}
		</>
	);
};

export default Questions;