import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {useTypedSelector} from "../hooks/useTypesSelector";

const SelfAccount: FC = () => {
	const user = useTypedSelector(state => state.user.user);
	const authenticated = useTypedSelector(state => state.auth.authenticated);
	const navigate = useNavigate();

	if(!authenticated){
		navigate('/login');
	}

	return (
		<div className="w-1/3 mx-auto flex gap-5 text-primaryTxt mt-10">
			<div className="border-2 border-primaryTxt">
				<img
					src={user?.profile_image === 'default.jpg' ? '/' + user?.profile_image : ''}
					className="w-[100px] h-[100px]"
					alt="Profile"/>
			</div>
			<div>
				<div>Username: {user?.username}</div>
				<div>Email: {user?.email}</div>
			</div>

		</div>
	);
};

export default SelfAccount;