import {RolesAction, RolesState, RolesActionTypes} from "../../types/types";

const initialState: RolesState = {
	roles: null,
	loading: true,
	error: null,
}

export const rolesReducer = (state = initialState, action: RolesAction): RolesState => {
	switch (action.type) {
		case RolesActionTypes.FETCH_ROLES:
			return {...state, loading: true};
		case RolesActionTypes.FETCH_ROLES_SUCCESS:
			return {...state, roles: action.payload, loading: false, error: null};
		case RolesActionTypes.FETCH_ROLES_ERROR:
			return {...state, roles: state.roles, loading: false, error: action.payload};
		default:
			return state;
	}
}