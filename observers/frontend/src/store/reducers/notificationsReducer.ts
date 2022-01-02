import {NotificationsAction, NotificationsActionTypes, NotificationsState} from "../../types/types";

const initialState: NotificationsState = {
	notifications: null,
	loading: true,
	error: null,
}

export const notificationsReducer = (state = initialState, action: NotificationsAction): NotificationsState => {
	switch (action.type) {
		case NotificationsActionTypes.FETCH_NOTIFICATIONS:
			return {...state, loading: true};
		case NotificationsActionTypes.FETCH_NOTIFICATIONS_SUCCESS:
			return {notifications: action.payload, loading: false, error: null};
		case NotificationsActionTypes.FETCH_NOTIFICATIONS_ERROR:
			return {notifications: state.notifications, loading: false, error: action.payload};
		default:
			return state;
	}
}