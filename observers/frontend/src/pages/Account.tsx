import React, {FC, useEffect, useState} from 'react';
import {IUser} from "../types/types";
import {useNavigate, useParams} from "react-router-dom";
import {instance} from "../Instance";
import Loader from "../components/Loader/Loader";

const Account: FC = () => {
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

	return (
		<>
			{
				loading
				? 	<Loader/>
				:	<div className="w-1/3 mx-auto flex gap-5 text-primaryTxt mt-10">
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
			}
		</>
	);
};

export default Account;