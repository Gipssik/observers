import {QuestionsAction, QuestionsActionTypes, QuestionsState} from "../../types/types";

const initialState: QuestionsState = {
	questions: null,
	question: null,
	loading: true,
	error: null,
}

export const questionsReducer = (state = initialState, action: QuestionsAction): QuestionsState => {
	switch (action.type) {
		case QuestionsActionTypes.FETCH_QUESTIONS:
			return {...state, loading: true};
		case QuestionsActionTypes.FETCH_QUESTION:
			return {questions: state.questions, loading: true, error: null};
		case QuestionsActionTypes.FETCH_QUESTION_SUCCESS:
			return {...state, question: action.payload, loading: false};
		case QuestionsActionTypes.FETCH_QUESTIONS_SUCCESS:
			return {questions: action.payload, loading: false, error: null};
		case QuestionsActionTypes.FETCH_QUESTIONS_ERROR:
			return {questions: state.questions, loading: false, error: action.payload};
		case QuestionsActionTypes.SET_SORTED_QUESTION:
			return {...state, questions: action.payload};
		default:
			return state;
	}
}