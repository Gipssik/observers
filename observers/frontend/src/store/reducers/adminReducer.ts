import {AdminAction, AdminActionTypes, AdminState} from "../../types/types";

const initialState: AdminState = {
	active: null
}

export const adminReducer = (state = initialState, action: AdminAction): AdminState => {
	switch (action.type) {
		case AdminActionTypes.SET_ACTIVE:
			return {...state, active: action.payload};
		default:
			return state;
	}
}