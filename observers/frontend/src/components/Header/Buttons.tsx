import React, {FC, useContext} from 'react';
import HeaderButton from "../Buttons/HeaderButton";
import {AuthContext} from "../../Context/Context";

const Buttons: FC = () => {
	const {isAuth, setIsAuth} = useContext(AuthContext);

	const signOut = () => {
		localStorage.removeItem('token');
		setIsAuth(false);
	}

	return (
		<div>
			{
				isAuth
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