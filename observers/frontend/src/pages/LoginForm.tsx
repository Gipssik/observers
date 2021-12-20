import React, {FC, useState} from 'react';
import {Form, Formik} from "formik";
import Modal from "../components/Modal/Modal";
import SubmitButton from "../components/Buttons/SubmitButton";
import LoginFields from "../components/Login/LoginFields";
import {NavLink, useNavigate} from "react-router-dom";
import {LoginSchema} from "../forms/forms";
import {useTypedSelector} from "../hooks/useTypesSelector";
import {useDispatch} from "react-redux";
import {fetchUser, loginUser} from "../store/action-creators/user";

const LoginForm: FC = () => {
	const [modal, setModal] = useState(false);
	const authenticated = useTypedSelector(state => state.auth.authenticated);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	if(authenticated){
		navigate('/account');
	}

	// const loginUser = async () => {
	// 	let username: any = document.querySelector<HTMLInputElement>('#username')?.value;
	// 	let password: any = document.querySelector<HTMLInputElement>('#password')?.value;
	//
	// 	let body = {
	// 		'username': username,
	// 		'password': password,
	// 	};
	//
	// 	let bodyFormData = new FormData();
	// 	bodyFormData.append('username', body.username);
	// 	bodyFormData.append('password', body.password);
	//
	// 	instance.post<IToken>('token/', bodyFormData)
	// 		.then(response => {
	// 			let token =
	// 				response.data.token_type.charAt(0).toUpperCase()
	// 				+ response.data.token_type.slice(1)
	// 				+ ` ${response.data.access_token}`;
	//
	// 			localStorage.setItem('token', token);
	// 			dispatch(fetchUser());
	// 			navigate('/questions');
	// 		})
	// 		.catch(error => {
	// 			setModal(true);
	// 		})
	// };

	return (
		<Formik
			initialValues={{
				username: '',
				password: ''
			}}
			validationSchema={LoginSchema}
			onSubmit={() => {dispatch(loginUser(navigate, setModal))}}
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
							<div className="submit-button-with-subtext">
								<SubmitButton content="Login" />
								<div className="subtext">
									Don't have an account? <NavLink className="subtext-link" to='/register'>Register here</NavLink>
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