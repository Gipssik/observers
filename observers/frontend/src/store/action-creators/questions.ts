import {instance} from "../../Instance";
import {IQuestion, IUser, QuestionsAction, QuestionsActionTypes} from "../../types/types";
import {Dispatch} from "redux";
import React from "react";

export const fetchQuestions = () => {
	return async (dispatch: Dispatch<QuestionsAction>) => {
		dispatch({type: QuestionsActionTypes.FETCH_QUESTIONS});
		instance.get<IQuestion[]>('forum/questions/')
			.then(response => {
				dispatch({type: QuestionsActionTypes.FETCH_QUESTIONS_SUCCESS, payload: response.data});
			})
			.catch(error => {
				dispatch({type: QuestionsActionTypes.FETCH_QUESTIONS_ERROR, payload: 'Error while loading questions'});
			});
	}
}

export const fetchQuestion = (id: number, setAuthor: React.Dispatch<any>, setLoadingAuthor: React.Dispatch<any>) => {
	return async (dispatch: Dispatch<QuestionsAction>) => {
		dispatch({type: QuestionsActionTypes.FETCH_QUESTION});
		instance.get<IQuestion>(`forum/questions/${id}/`)
			.then(response => {
				dispatch({type: QuestionsActionTypes.FETCH_QUESTION_SUCCESS, payload: response.data});
				instance.patch<IQuestion>(`forum/questions/${id}/views/?views=${response.data.views + 1}`);

				instance.get<IUser>(`accounts/users/${response.data.author_id}/`)
					.then(response => {
						setAuthor(response.data);
						setLoadingAuthor(false);
					})
			})
			.catch(error => {
				dispatch({type: QuestionsActionTypes.FETCH_QUESTIONS_ERROR, payload: 'Error while loading question'})
			});

	}
}


