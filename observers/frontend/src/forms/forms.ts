import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
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

export const RegisterSchema = Yup.object().shape({
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
});

export const AddQuestionSchema = Yup.object().shape({
	title: Yup.string()
		.min(5, 'Question\'s title must be at least 5 characters long.')
		.max(128, 'Question\'s title must be 128 characters long maximum.')
		.required('Required'),
	content: Yup.string()
		.min(32, 'Question\'s content must be at least 32 characters long.')
		.required('Required'),
})