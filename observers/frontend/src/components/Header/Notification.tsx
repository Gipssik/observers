import React, {FC} from 'react';
import {INotification, QuestionsActionTypes} from "../../types/types";
import {NavLink, useNavigate} from "react-router-dom";
import {instance} from "../../Instance";
import {useDispatch} from "react-redux";
import {fetchNotifications} from "../../store/action-creators/notifications";

interface NotificationProps{
	notification: INotification;
	setVisible: any;
}

const Notification: FC<NotificationProps> = ({notification, setVisible}) => {
	const dispatch = useDispatch();

	return (
		<NavLink to={'/questions/' + notification.question_id} className="notification" onClick={() => {
			// TODO: fix rerender.
			dispatch({type: QuestionsActionTypes.FETCH_QUESTION_SUCCESS, payload: null})
			setVisible(false);
			instance.delete(`accounts/notifications/${notification.id}/`)
				.then(response => {
					dispatch(fetchNotifications(notification.user_id));
				})
		}}>
			{notification.title.slice(0, 50) + (notification.title.length > 50 ? '...' : '')}
		</NavLink>
	);
};

export default Notification;