import {AuthAction, AuthActionTypes, IToken, IUser, UserAction, UserActionTypes} from "../../types/types";
import {Dispatch} from "redux";
import {instance} from "../../Instance";
import {NavigateFunction} from "react-router-dom";

export const fetchUser = () => {
	return async (dispatch: Dispatch<UserAction | AuthAction>) => {
		dispatch({type: UserActionTypes.FETCH_USER});
		instance.get<IUser>('accounts/users/me/')
			.then(response => {
				dispatch({type: AuthActionTypes.SET_TRUE, authenticated: true});
				dispatch({type: UserActionTypes.FETCH_USER_SUCCESS, payload: response.data});
			})
			.catch(error => {
				dispatch({type: AuthActionTypes.SET_FALSE, authenticated: false});
				dispatch({type: UserActionTypes.FETCH_USER_ERROR, payload: 'Error while loading user'});
			});
	}
}

export const loginUser = (navigate: NavigateFunction, setModal: any) => {
	return async (dispatch: any) => {
		let username: any = document.querySelector<HTMLInputElement>('#username')?.value;
		let password: any = document.querySelector<HTMLInputElement>('#password')?.value;

		let bodyFormData = new FormData();
		bodyFormData.append('username', username);
		bodyFormData.append('password', password);

		instance.post<IToken>('token/', bodyFormData)
			.then(response => {
				let data = response.data;
				let token = `${data.token_type.charAt(0).toUpperCase()}${data.token_type.slice(1)} ${data.access_token}`;

				localStorage.setItem('token', token);
				dispatch(fetchUser());
				navigate('/questions');
			})
			.catch(error => {
				setModal(true);
			})
	}
}
