import {instance} from "../../Instance";
import {IQuestion, ITag, IUser, QuestionsAction, QuestionsActionTypes} from "../../types/types";
import {Dispatch} from "redux";
import React from "react";

export const fetchQuestions = (params: string | undefined) => {
	return async (dispatch: Dispatch<QuestionsAction>) => {
		dispatch({type: QuestionsActionTypes.FETCH_QUESTIONS});
		instance.get<IQuestion[]>(`forum/questions/${params ? `?${params}` : ''}`)
			.then(response => {
				dispatch({type: QuestionsActionTypes.FETCH_QUESTIONS_SUCCESS, payload: response.data});
			})
			.catch(error => {
				dispatch({type: QuestionsActionTypes.FETCH_QUESTIONS_ERROR, payload: 'Error while loading questions'});
			});
	}
}

export const fetchQuestion = (
	id: number,
	setAuthor: React.Dispatch<any>,
	setLoadingAuthor: React.Dispatch<any>,
	addView: boolean = true
) => {
	return async (dispatch: Dispatch<QuestionsAction>) => {
		dispatch({type: QuestionsActionTypes.FETCH_QUESTION});
		instance.get<IQuestion>(`forum/questions/${id}/`)
			.then(response => {
				dispatch({type: QuestionsActionTypes.FETCH_QUESTION_SUCCESS, payload: response.data});
				if(addView)
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

export const fetchQuestionsByTag = (tagName: string) => {
	return async (dispatch: Dispatch<QuestionsAction>) => {
		dispatch({type: QuestionsActionTypes.FETCH_QUESTIONS});
		instance.get<ITag>(`forum/tags/${tagName}`)
			.then(response =>{
				if(response.data.questions){
					dispatch({type: QuestionsActionTypes.FETCH_QUESTIONS_SUCCESS, payload: response.data.questions});
				}

			})
	}
}
