import React, {FC, useContext, useState} from 'react';
import * as Yup from "yup";
import {Form, Formik} from "formik";
import Modal from "../components/Modal/Modal";
import SubmitButton from "../components/Buttons/SubmitButton";
import LoginFields from "../components/Login/LoginFields";
import axios from "axios";
import {IToken} from "../Types/Types";
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../Context/Context";

const LoginForm: FC = () => {
	const [modal, setModal] = useState(false);
	const {isAuth, setIsAuth} = useContext(AuthContext);
	const navigate = useNavigate();

	const LoginSchema = Yup.object().shape({
		username: Yup.string()
			.matches(/^[a-zA-Z0-9_]+$/, 'Username must contain only alphanumeric character plus _.')
			.min(4, 'Username must be at least 4 characters long.')
			.max(20, 'Username\'s length must be lower than 20.')
			.required('Required'),
		password: Yup.string()
			.min(4, 'Password must be at least 4 characters long.')
			.max(20, 'Password\'s length must be lower than 20.')
			.required('Required')
	});

	const loginUser = async () => {
		let username: any = document.querySelector<HTMLInputElement>('#username')?.value;
		let password: any = document.querySelector<HTMLInputElement>('#password')?.value;

		let body = {
			'username': username,
			'password': password,
		};

		let bodyFormData = new FormData();
		bodyFormData.append('username', body.username);
		bodyFormData.append('password', body.password);

		axios.post<IToken>('http://127.0.0.1:8000/api/token/', bodyFormData)
			.then(response => {
				let token =
					response.data.token_type.charAt(0).toUpperCase()
					+ response.data.token_type.slice(1)
					+ ` ${response.data.access_token}`;

				localStorage.setItem('token', token);
				setIsAuth(true);
				navigate('/questions');
			})
			.catch(error => {
				setModal(true);
			})
	};

	return (
		<Formik
			initialValues={{
				username: '',
				password: ''
			}}
			validationSchema={LoginSchema}
			onSubmit={loginUser}
		>
			{({errors, touched}) => {
				return (
					<div>
						<Modal visible={modal} setVisible={setModal}>
							Wrong username or password.
						</Modal>
						<Form className="register-form">
							<h1 className="register-title">Login form</h1>
							<LoginFields errors={errors} touched={touched} />
							<div className="flex flex-col items-center gap-3">
								<SubmitButton content="Login" />
								<div className="text-sm text-secondaryTxt">
									Don't have an account? <NavLink className="underline" to='/register'>Register here</NavLink>
								</div>
							</div>
						</Form>
					</div>
				)
			}}
		</Formik>
	);
};

export default LoginForm;