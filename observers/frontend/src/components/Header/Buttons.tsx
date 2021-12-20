import React, {FC} from 'react';
import HeaderButton from "../Buttons/HeaderButton";
import {useDispatch} from "react-redux";
import {AuthActionTypes, UserActionTypes} from "../../types/types";
import {useTypedSelector} from "../../hooks/useTypesSelector";

const Buttons: FC = () => {
	const user = useTypedSelector(state => state.user.user);
	const authenticated = useTypedSelector(state => state.auth.authenticated);
	const dispatch = useDispatch();

	const signOut = () => {
		dispatch({type: UserActionTypes.DELETE_USER});
		localStorage.removeItem('token');
		dispatch({type: AuthActionTypes.SET_FALSE});
	}

	return (
		<div>
			{
				authenticated
				? 	<div className="buttons">
						<HeaderButton content='account' url='/account'/>
						<HeaderButton content='sign out' url='/questions' onClick={signOut}/>
					</div>
				: 	<div className='buttons'>
						<HeaderButton content='register' url='/register'/>
						<HeaderButton content='login' url='/login'/>
					</div>
			}
		</div>

	);
};

export default Buttons;