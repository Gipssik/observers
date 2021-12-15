import React, {FC} from 'react';
import RegisterField from "./RegisterField";
import SubmitButton from "../Buttons/SubmitButton";
import axios from "axios";
import {IUser} from "../../types/types";

const RegisterForm: FC = () => {
	const registerUser = async () => {
		let username: string | undefined = document.querySelector<HTMLInputElement>('#username')?.value;
		let email: string | undefined = document.querySelector<HTMLInputElement>('#email')?.value;
		let password: string | undefined = document.querySelector<HTMLInputElement>('#password')?.value;

		let body = {
			'username': username,
			'email': email,
			'password': password,
			'role_id': 2
		};

		console.log(body);

		let response = await axios.post<IUser>('http://127.0.0.1:8000/api/accounts/users/', body);
		console.log(response.data);
	};

	return (
		<div className='w-1/3 mx-auto flex flex-col items-center gap-10 mt-8'>
			<h1 className='text-5xl text-secondaryTxt text-center'>Registration form</h1>
			<RegisterField content="username" type="text" id="username"/>
			<RegisterField content="email" type="email" id="email"/>
			<RegisterField content="password" type="password" id="password"/>
			<RegisterField content="confirm password" type="password" id="confirmPassword"/>
			<SubmitButton content="Submit" onClick={registerUser}/>
		</div>
	);
};

export default RegisterForm;