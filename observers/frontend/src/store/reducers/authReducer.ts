import {AuthAction, AuthActionTypes, AuthState} from "../../types/types";

const initialState: AuthState = {
	authenticated: false,
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
	switch (action.type) {
		case AuthActionTypes.SET_TRUE:
			return {authenticated: true};
		case AuthActionTypes.SET_FALSE:
			return {authenticated: false};
		default:
			return state;
	}
}