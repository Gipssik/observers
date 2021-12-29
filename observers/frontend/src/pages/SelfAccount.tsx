import React, {FC, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useTypedSelector} from "../hooks/useTypesSelector";

const SelfAccount: FC = () => {
	const user = useTypedSelector(state => state.user.user);
	const authenticated = useTypedSelector(state => state.auth.authenticated);
	const navigate = useNavigate();

	useEffect(() => {
		if(!authenticated){
			navigate('/login');
		}
	}, [authenticated]);

	return (
		<div className="account-container">
			<div className="account-img-block">
				<img
					src={user?.profile_image === 'default.jpg' ? '/' + user?.profile_image : ''}
					className="account-img"
					alt="Profile"/>
			</div>
			<div className="account-about">
				<div>Username: {user?.username}</div>
				<div>Email: {user?.email}</div>
			</div>

		</div>
	);
};

export default SelfAccount;