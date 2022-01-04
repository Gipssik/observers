import React, {FC, useEffect, useState} from 'react';
import {IQuestion, IUser} from "../types/types";
import {useNavigate, useParams} from "react-router-dom";
import {instance} from "../Instance";
import Loader from "../components/Loader/Loader";
import {useTypedSelector} from "../hooks/useTypesSelector";
import UserQuestions from "../components/SelfAccount/UserQuestions";
import Email from "../components/SelfAccount/Email";

const UserAccount: FC = () => {
	const self = useTypedSelector(state => state.user.user);
	const [user, setUser] = useState<IUser | null>(null);
	const [loading, setLoading] = useState(true);
	const [userQuestions, setUserQuestions] = useState<IQuestion[]>();
	const navigate = useNavigate();
	const {username} = useParams();

	useEffect(() => {
		instance.get<IUser>(`accounts/users/${username}/`)
			.then(response => {
				setUser(response.data);
				setLoading(false);
			})
			.catch(error => {
				navigate('/404');
			});
	}, []);

	useEffect(() => {
		if(!user)
			return;
		setLoading(true);
		instance.get<IQuestion[]>(`forum/questions/${user.id}/user/`)
			.then(response => {
				setUserQuestions(response.data);
				setLoading(false);
			})
	}, [user])

	useEffect(() => {
		if(user && user.id === self?.id){
			navigate('/account');
		}
	}, [user, self, navigate]);

	return (
		<div>
			{
				loading
				? 	<Loader/>
				:
				<>
					<div className="account-container">
						<div className="account-img-block">
							<img
								src={user?.profile_image === 'default.jpg' ? '/' + user?.profile_image : ''}
								className="account-img"
								alt="Profile"/>
						</div>
						<div className="account-about">
							<div className="text-5xl font-bold">{user?.username}</div>
							<div className="flex gap-2 text-lg items-center"><Email/>{user?.email}</div>
						</div>
					</div>
					{
						userQuestions && userQuestions.length > 0 ?
							<UserQuestions questions={userQuestions}/>
							:
							null
					}
				</>
			}
		</div>
	);
};

export default UserAccount;