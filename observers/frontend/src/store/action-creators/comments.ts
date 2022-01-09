import {Dispatch} from "redux";
import {CommentsAction, CommentsActionTypes, IComment} from "../../types/types";
import {instance} from "../../Instance";

export const fetchComments = () => {
	return async (dispatch: Dispatch<CommentsAction>) => {
		dispatch({type: CommentsActionTypes.FETCH_COMMENTS});
		instance.get<IComment[]>('forum/comments/')
			.then(response => {
				dispatch({type: CommentsActionTypes.FETCH_COMMENTS_SUCCESS, payload: response.data});
			})
			.catch(error => {
				dispatch({type: CommentsActionTypes.FETCH_COMMENTS_ERROR, payload: "Error while loading comments"});
			})
	}
}