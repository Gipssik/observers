import {TagsAction, TagsActionTypes, TagsState} from "../../types/types";

const initialState: TagsState = {
	tags: null,
	loading: true,
	error: null,
}

export const tagsReducer = (state = initialState, action: TagsAction): TagsState => {
	switch (action.type) {
		case TagsActionTypes.FETCH_TAGS:
			return {...state, loading: true};
		case TagsActionTypes.FETCH_TAGS_SUCCESS:
			return {tags: action.payload, loading: false, error: null};
		case TagsActionTypes.FETCH_TAGS_ERROR:
			return {tags: state.tags, loading: false, error: action.payload};
		default:
			return state;
	}
}