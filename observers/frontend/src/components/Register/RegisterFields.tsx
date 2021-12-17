import React, {FC} from 'react';
import RegisterField from "./RegisterField";
import {FormikErrors, FormikTouched} from "formik";

interface RegisterFieldsProps {
	errors: FormikErrors<any>;
	touched: FormikTouched<any>;
}

const RegisterFields: FC<RegisterFieldsProps> = ({errors, touched}) => {
	return (
		<div className="flex flex-col gap-8">
			<RegisterField
				content="username"
				type="text"
				id="username"
				errors={errors.username}
				touched={touched.username}
			/>
			<RegisterField
				content="email"
				type="email"
				id="email"
				errors={errors.email}
				touched={touched.email}
			/>
			<RegisterField
				content="password"
				type="password"
				id="password"
				errors={errors.password}
				touched={touched.password}
			/>
			<RegisterField
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