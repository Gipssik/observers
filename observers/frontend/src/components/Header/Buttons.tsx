import React, {FC, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {AuthActionTypes, ChatActionTypes, UserActionTypes} from "../../types/types";
import {useTypedSelector} from "../../hooks/useTypesSelector";
import Notifications from "./Notifications";
import SignOut from "./SignOut";
import AccountIcon from "./AccountIcon";
import LoginIcon from "./LoginIcon";
import SignUp from "./SignUp";
import {useNavigate} from "react-router-dom";

const Buttons: FC = () => {
	const authenticated = useTypedSelector(state => state.auth.authenticated);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const signOut = () => {
		dispatch({type: UserActionTypes.DELETE_USER});
		localStorage.removeItem('token');
		dispatch({type: AuthActionTypes.SET_FALSE});
		dispatch({type: ChatActionTypes.CLEAR_STATE});
	}

	return (
		<div>
			{
				authenticated
				? 	<div className="buttons">
						<Notifications/>
						<AccountIcon onClick={() => navigate('/account')}/>
						<SignOut onClick={() => {
								signOut();
								navigate('/questions');
							}}
						/>
					</div>
				: 	<div className='buttons'>
						<SignUp onClick={() => navigate('/register')}/>
						<LoginIcon onClick={() => navigate('/login')}/>
					</div>
			}
		</div>

	);
};

export default Buttons;