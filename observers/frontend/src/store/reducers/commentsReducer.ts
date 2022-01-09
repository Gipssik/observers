import {CommentsAction, CommentsActionTypes, CommentsState} from "../../types/types";

const initialState: CommentsState = {
	comments: null,
	loading: true,
	error: null,
}

export const commentsReducer = (state = initialState, action: CommentsAction): CommentsState => {
	switch (action.type) {
		case CommentsActionTypes.FETCH_COMMENTS:
			return {...state, loading: true};
		case CommentsActionTypes.FETCH_COMMENTS_SUCCESS:
			return {comments: action.payload, loading: false, error: null};
		case CommentsActionTypes.FETCH_COMMENTS_ERROR:
			return {comments: state.comments, loading: false, error: action.payload};
		default:
			return state;
	}
}