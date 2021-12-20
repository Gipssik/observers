import React, {FC} from 'react';
import FormField from "../Fields/FormField";
import {LoginFieldsProps} from "../../types/types";

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