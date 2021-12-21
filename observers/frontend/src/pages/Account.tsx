import React, {FC, useEffect, useState} from 'react';
import {IUser} from "../types/types";
import {useNavigate, useParams} from "react-router-dom";
import {instance} from "../Instance";
import Loader from "../components/Loader/Loader";
import {useTypedSelector} from "../hooks/useTypesSelector";

const Account: FC = () => {
	const self = useTypedSelector(state => state.user.user);
	const [user, setUser] = useState<IUser | null>(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const {username} = useParams();

	useEffect(() => {
		instance.get<IUser>(`accounts/users/${username}`)
			.then(response => {
				setUser(response.data);
				setLoading(false);
			})
			.catch(error => {
				navigate('/404');
			});
	}, []);

	useEffect(() => {
		if(user && user.id === self?.id){
			navigate('/account');
		}
	}, [user]);

	return (
		<>
			{
				loading
				? 	<Loader/>
				:	<div className="account-container">
						<div className="account-img-block">
							<img
								src={user?.profile_image === 'default.jpg' ? '/' + user?.profile_image : ''}
								className="account-img"
								alt="Profile"/>
						</div>
						<div>
							<div>Username: {user?.username}</div>
							<div>Email: {user?.email}</div>
						</div>

					</div>
			}
		</>
	);
};

export default Account;