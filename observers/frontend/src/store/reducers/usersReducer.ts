import {UsersAction, UsersActionTypes, UsersState} from "../../types/types";

const initialState: UsersState = {
	users: null,
	loading: true,
	error: null,
}

export const usersReducer = (state = initialState, action: UsersAction): UsersState => {
	switch (action.type) {
		case UsersActionTypes.FETCH_USERS:
			return {...state, loading: true};
		case UsersActionTypes.FETCH_USERS_SUCCESS:
			return {...state, users: action.payload, loading: false, error: null};
		case UsersActionTypes.FETCH_USERS_ERROR:
			return {...state, users: state.users, loading: false, error: action.payload};
		default:
			return state;
	}
}