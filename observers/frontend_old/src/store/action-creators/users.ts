import {Dispatch} from "redux";
import {IUser, UsersAction, UsersActionTypes} from "../../types/types";
import {instance} from "../../Instance";

export const fetchUsers = () => {
	return async (dispatch: Dispatch<UsersAction>) => {
		dispatch({type: UsersActionTypes.FETCH_USERS});
		instance.get<IUser[]>('accounts/users/')
			.then(response => {
				dispatch({type: UsersActionTypes.FETCH_USERS_SUCCESS, payload: response.data});
			})
			.catch(error => {
				dispatch({type: UsersActionTypes.FETCH_USERS_ERROR, payload: "Error while loading users"});
			})
	}
}