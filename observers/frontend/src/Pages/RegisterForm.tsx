import React, {FC, useContext, useState} from 'react';
import SubmitButton from "../components/Buttons/SubmitButton";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {IUser} from "../Types/Types";
import RegisterFields from "../components/Register/RegisterFields";
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import Modal from '../components/Modal/Modal';
import {AuthContext} from "../Context/Context";
import {instance} from "../Instance";

const RegisterForm: FC = () => {
	const navigate = useNavigate();
	const [modal, setModal] = useState<boolean>(false);
	const {isAuth} = useContext(AuthContext);

	if(isAuth){
		return <Navigate to='/account'/>
	}

	const RegisterSchema = Yup.object().shape({
		username: Yup.string()
			.matches(/^[a-zA-Z0-9_]+$/, 'Username must contain only alphanumeric character plus _.')
			.min(4, 'Username must be at least 4 characters long.')
			.max(20, 'Username\'s length must be lower than 20.')
			.required('Required'),
		email: Yup.string().email('Invalid email').required('Required'),
		password: Yup.string()
			.min(4, 'Password must be at least 4 characters long.')
			.max(20, 'Password\'s length must be lower than 20.')
			.required('Required'),
		checkPassword: Yup.string().when("password", {
			is: (val: string) => (!!(val && val.length > 0)),
			then: Yup.string().oneOf(
				[Yup.ref("password")],
				"Passwords need to be the same"
			)
		})
			.required('Required')
	})

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
							<div className="flex flex-col items-center gap-3">
								<SubmitButton content="Submit" />
								<div className="text-sm text-secondaryTxt">
									Already have an account? <NavLink className="underline" to='/login'>Log in here</NavLink>
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