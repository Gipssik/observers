import React, {FC, useContext, useEffect, useState} from 'react';
import {IUser} from "../Types/Types";
import {AuthContext} from "../Context/Context";
import {useNavigate} from "react-router-dom";
import {instance} from "../Instance";
import Loader from "../components/Loader/Loader";

const SelfAccount: FC = () => {
	const [self, setSelf] = useState<IUser | null>(null);
	const [loading, setLoading] = useState(true);
	const {isAuth, setIsAuth} = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if(!isAuth){
			navigate('/login');
		}

		const token = localStorage.getItem('token');
		if(token !== null){
			instance.get<IUser>('accounts/users/me')
				.then(response => {
					setSelf(response.data);
					setLoading(false);
				})
				.catch(error => {
					localStorage.removeItem('token');
					setIsAuth(false);
				});
		}

	}, [isAuth]);

	return (
		<>
			{
				loading
				? 	<Loader/>
				: 	<div className="w-1/3 mx-auto flex gap-5 text-primaryTxt mt-10">
						<div className="border-2 border-primaryTxt">
							<img
								src={self?.profile_image === 'default.jpg' ? '/' + self?.profile_image : ''}
								className="w-[100px] h-[100px]"
								alt="Profile"/>
						</div>
						<div>
							<div>Username: {self?.username}</div>
							<div>Email: {self?.email}</div>
						</div>

					</div>
			}
		</>
	);
};

export default SelfAccount;