import React, {FC} from 'react';
import FormField from "../Fields/FormField";
import {FormikErrors, FormikTouched} from "formik";

interface LoginFieldsProps {
	errors: FormikErrors<any>;
	touched: FormikTouched<any>;
}

const LoginFields: FC<LoginFieldsProps> = ({errors, touched}) => {
	return (
		<div className="form">
			<FormField
				content="username"
				type="text"
				id="username"
				errors={errors.username}
				touched={touched.username}
			/>
			<FormField
				content="password"
				type="password"
				id="password"
				errors={errors.password}
				touched={touched.password}
			/>
		</div>
	);
};

export default LoginFields;