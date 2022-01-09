import {Dispatch} from "redux";
import {IRole, RolesAction, RolesActionTypes} from "../../types/types";
import {instance} from "../../Instance";

export const fetchRoles = () => {
	return async (dispatch: Dispatch<RolesAction>) => {
		dispatch({type: RolesActionTypes.FETCH_ROLES});
		instance.get<IRole[]>('accounts/roles/')
			.then(response => {
				dispatch({type: RolesActionTypes.FETCH_ROLES_SUCCESS, payload: response.data});
			})
			.catch(error => {
				dispatch({type: RolesActionTypes.FETCH_ROLES_ERROR, payload: 'Error while loading roles'});
			})
	}
}