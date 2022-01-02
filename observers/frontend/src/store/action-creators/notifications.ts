import {Dispatch} from "redux";
import {INotification, NotificationsAction, NotificationsActionTypes} from "../../types/types";
import {instance} from "../../Instance";

export const fetchNotifications = (userId: number) => {
	return async (dispatch: Dispatch<NotificationsAction>) => {
		dispatch({type: NotificationsActionTypes.FETCH_NOTIFICATIONS});
		instance.get<INotification[]>(`accounts/notifications/${userId}/`)
			.then(response => {
				dispatch({type: NotificationsActionTypes.FETCH_NOTIFICATIONS_SUCCESS, payload: response.data});
			})
			.catch(error => {
				dispatch({
					type: NotificationsActionTypes.FETCH_NOTIFICATIONS_ERROR,
					payload: 'Error while loading notifications'
				});
			})
	}
}