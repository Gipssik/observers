import React, {FC, useState} from 'react';
import {useTypedSelector} from "../../hooks/useTypesSelector";
import SubmitButton from "../Buttons/SubmitButton";
import {AccountEditProps, IToken, IUser} from "../../types/types";
import {instance} from "../../Instance";

const About: FC<AccountEditProps> = ({setLoading, setModal, setModalData}) => {
	const user = useTypedSelector(state => state.user.user);
	const [emailError, setEmailError] = useState('');
	const [oldError, setOldError] = useState('');
	const [newError, setNewError] = useState('');

	const saveEmail = async () => {
		let email = document.querySelector<HTMLInputElement>('#email');
		const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		if(user
			&& email
			&& user.email !== email.value
			&& email.value.toLowerCase().match(re)
		){
			let u = await instance.get<IUser>(`accounts/users/${email.value}/`);
			if(u.data){
				setEmailError('This email is already taken.');
				return;
			}
			
			setLoading(true);

			instance.patch<IUser>(`accounts/users/${user.id}/`, {email: email.value})
				.then(response => {
					user.email = response.data.email;
				})
				.catch(error => {
					console.log(error);
				})
				.then(() => {
					setLoading(false);
					setModalData('Email was successfully updated!');
					setModal(true);
				})

		}else if(email && !email.value.toLowerCase().match(re)){
			setEmailError("It is not a valid email");
		}else{
			setEmailError('');
		}
	}

	const changePassword = () => {
		let oldPassword = document.querySelector<HTMLInputElement>('#old');
		let newPassword = document.querySelector<HTMLInputElement>('#new');

		if(!user || !oldPassword || !newPassword)
			return;

		if(newPassword && (newPassword.value.length < 4 || newPassword.value.length > 19)){
			setNewError('Password\'s length must be lower than 20 and higher than 3.');
			return;
		}else {
			setNewError('');
		}

		if(oldPassword && (oldPassword.value.length < 4 || oldPassword.value.length > 19)){
			setOldError('Password\'s length must be lower than 20 and higher than 3.');
			return;
		}else {
			setOldError('');
		}

		setLoading(true);
		let data = new FormData();
		data.append('username', user.username)
		data.append('password', oldPassword.value);
		instance.post<IToken>('token/', data)
			.then(response => {
				instance.patch<IUser>(`accounts/users/${user.id}/`, {password: newPassword?.value})
					.then(response => {
						setLoading(false);
						setModalData('Password was successfully updated!');
						setModal(true);
					})
			})
			.catch(error => {
				setLoading(false);
				setModalData('Wrong password!');
				setModal(true);
			})
	}

	return (
		<div className="account-about">
			<div className="text-5xl font-bold">{user?.username}</div>
			<div className="account-about-block">
				<div className="account-field-block">
					<div className="account-field-with-label">
						<span>
							Email:
							{
								emailError ?
									<span className="field-error">{emailError}</span>
									:
									null
							}
						</span>
						<input
							id="email"
							type="email"
							className="field"
							defaultValue={user?.email}
							placeholder="Email"
						/>
					</div>
					<SubmitButton content="Save" onClick={saveEmail}/>
				</div>
				<div className="account-change-password-title">
					Change password:
				</div>
				<div className="account-field-block">
					<div className="account-field-with-label">
						<span>
							Old password:
							{
								oldError ?
									<span className="field-error">{oldError}</span>
									:
									null
							}
						</span>
						<input
							id="old"
							type="password"
							className="field"
							placeholder="Old password"
						/>
					</div>
				</div>
				<div className="account-field-block">
					<div className="account-field-with-label">
						<span>
							New password:
							{
								newError ?
									<span className="field-error">{newError}</span>
									:
									null
							}
						</span>
						<input
							id="new"
							type="password"
							className="field"
							placeholder="New password"
						/>
					</div>
					<SubmitButton content="Save" onClick={changePassword}/>
				</div>
			</div>
		</div>
	);
};

export default About;