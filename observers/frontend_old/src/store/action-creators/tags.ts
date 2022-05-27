import {Dispatch} from "redux";
import {ITag, TagsAction, TagsActionTypes} from "../../types/types";
import {instance} from "../../Instance";

export const fetchTags = () => {
	return async (dispatch: Dispatch<TagsAction>) => {
		dispatch({type: TagsActionTypes.FETCH_TAGS});
		instance.get<ITag[]>('forum/tags/')
			.then(response => {
				dispatch({type: TagsActionTypes.FETCH_TAGS_SUCCESS, payload: response.data});
			})
			.catch(error => {
				dispatch({type: TagsActionTypes.FETCH_TAGS_ERROR, payload: "Error while loading tags"});
			})
	}
}