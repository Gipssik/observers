import {AdminAction, AdminActionTypes, AdminState} from "../../types/types";

const initialState: AdminState = {
	active: null,
	modalContent: '',
	modalType: 'show',
	showModal: false,
	onConfirm: () => {},
}

export const adminReducer = (state = initialState, action: AdminAction): AdminState => {
	switch (action.type) {
		case AdminActionTypes.SET_ACTIVE:
			return {...state, active: action.payload};
		case AdminActionTypes.SET_MODAL_CONTENT:
			return {...state, modalContent: action.payload};
		case AdminActionTypes.SET_MODAL_TYPE:
			return {...state, modalType: action.payload};
		case AdminActionTypes.SET_MODAL_SHOW:
			return {...state, showModal: action.payload};
		case AdminActionTypes.SET_MODAL_ON_CONFIRM:
			return {...state, onConfirm: action.payload};
		default:
			return state;
	}
}