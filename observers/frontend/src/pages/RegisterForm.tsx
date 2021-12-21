import React, {FC, useState} from 'react';
import SubmitButton from "../components/Buttons/SubmitButton";
import {Form, Formik} from "formik";
import {IUser} from "../types/types";
import RegisterFields from "../components/Register/RegisterFields";
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import Modal from '../components/Modal/Modal';
import {instance} from "../Instance";
import {RegisterSchema} from "../forms/forms";
import {useTypedSelector} from "../hooks/useTypesSelector";

const RegisterForm: FC = () => {
	const authenticated = useTypedSelector(state => state.auth.authenticated);
	const navigate = useNavigate();
	const [modal, setModal] = useState<boolean>(false);

	if(authenticated){
		return <Navigate to='/account'/>
	}

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

		instance.post<IUser>('accounts/users/', body)
			.then(response => {
				navigate('/login');
			})
			.catch(error => {
				setModal(true);
			});

	};

	return (
		<Formik
		initialValues={{
			username: '',
			email: '',
			password: '',
			checkPassword: ''
		}}
		validationSchema={RegisterSchema}
		onSubmit={registerUser}
		>
			{({ errors, touched }) => {
				return (
					<div>
						<Modal visible={modal} setVisible={setModal}>
							User with this username or email already exists.
						</Modal>
						<Form className="register-form">
							<h1 className="register-title">Registration form</h1>
							<RegisterFields errors={errors} touched={touched} />
							<div className="submit-button-with-subtext">
								<SubmitButton content="Submit" />
								<div className="subtext">
									Already have an account? <NavLink className="subtext-link" to='/login'>Log in here</NavLink>
								</div>
							</div>
						</Form>
					</div>
				)
			}}
		</Formik>
	);
};

export default RegisterForm;