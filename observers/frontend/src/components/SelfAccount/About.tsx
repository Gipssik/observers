import React, {FC, useState} from 'react';
import {useTypedSelector} from "../../hooks/useTypesSelector";
import SubmitButton from "../Buttons/SubmitButton";
import {AccountEditProps, IUser} from "../../types/types";
import {instance} from "../../Instance";

const About: FC<AccountEditProps> = ({setLoading}) => {
	const user = useTypedSelector(state => state.user.user);
	const [emailError, setEmailError] = useState('');

	const saveEmail = async () => {
		let email = document.querySelector<HTMLInputElement>('#email');
		const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		if(user
			&& email
			&& user.email !== email.value
			&& email.value.toLowerCase().match(re)
		){
			let u = await instance.get<IUser>(`accounts/users/${email.value}`);
			if(u.data){
				setLoading(false);
				// TODO: set email error after set loading
				setEmailError('This email is already taken.');
				return;
			}
			
			setLoading(true);

			instance.patch<IUser>(`accounts/users/${user.id}`, {email: email.value})
				.then(response => {
					user.email = response.data.email;
				})
				.catch(error => {
					console.log(error);
				})
				.then(() => {
					setLoading(false);
				})

		}else if(email && !email.value.toLowerCase().match(re)){
			setEmailError("It is not a valid email");
		}else{
			setEmailError('');
		}
	}

	return (
		<div className="account-about">
			<div className="text-5xl font-bold">{user?.username}</div>
			<table className="account-about-table">
				<tbody>
					<tr>
						<td>
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
						</td>
						<td>
							<SubmitButton content="Save" onClick={saveEmail}/>
						</td>
					</tr>
					<tr>
						<td>
							<span>Change password:</span>
						</td>
					</tr>
					<tr>
						<td>
							<span>Old password:</span>
							<input
								type="password"
								className="field"
								placeholder="Old password"
							/>
						</td>
						<td></td>
					</tr>
					<tr>
						<td>
							<span>New password:</span>
							<input
								type="password"
								className="field"
								placeholder="New password"
							/>
						</td>
						<td>
							<SubmitButton content="Save" onClick={() => console.log(123)}/>
						</td>
					</tr>
				</tbody>
			</table>

		</div>
	);
};

export default About;