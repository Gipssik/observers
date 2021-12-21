import React, {FC, useState} from 'react';
import {Form, Formik} from "formik";
import Modal from "../components/Modal/Modal";
import SubmitButton from "../components/Buttons/SubmitButton";
import LoginFields from "../components/Login/LoginFields";
import {NavLink, useNavigate} from "react-router-dom";
import {LoginSchema} from "../forms/forms";
import {useTypedSelector} from "../hooks/useTypesSelector";
import {useDispatch} from "react-redux";
import {loginUser} from "../store/action-creators/user";

const LoginForm: FC = () => {
	const [modal, setModal] = useState(false);
	const authenticated = useTypedSelector(state => state.auth.authenticated);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	if(authenticated){
		navigate('/account');
	}

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