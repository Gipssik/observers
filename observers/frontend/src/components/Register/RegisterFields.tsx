import React, {FC} from 'react';
import FormField from "../Fields/FormField";
import {RegisterFieldsProps} from "../../types/types";


const RegisterFields: FC<RegisterFieldsProps> = ({errors, touched}) => {
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
				content="email"
				type="email"
				id="email"
				errors={errors.email}
				touched={touched.email}
			/>
			<FormField
				content="password"
				type="password"
				id="password"
				errors={errors.password}
				touched={touched.password}
			/>
			<FormField
				content="check password"
				type="password"
				id="checkPassword"
				errors={errors.checkPassword}
				touched={touched.checkPassword}
			/>
		</div>
	);
};

export default RegisterFields;