import React, {FC} from 'react';
import {AddQuestionSchema} from "../../forms/forms";
import {Form, Formik} from "formik";
import SubmitButton from "../Buttons/SubmitButton";
import AddQuestionFields from "./AddQuestionFields";
import {instance} from "../../Instance";
import {IQuestion} from "../../types/types";
import {useNavigate} from "react-router-dom";

const AddQuestionForm: FC = () => {
	const navigate = useNavigate();

	const createQuestion = () => {
		const title: any = document.querySelector<HTMLInputElement>('#title')?.value;
		const content: any = document.querySelector<HTMLInputElement>('#content')?.value;

		const body = {title, content};
		console.log(body)

		instance.post<IQuestion>('forum/questions/', body)
			.then(response => {
				navigate('/questions');
			});
	}

	return (
		<Formik
			initialValues={{
				title: '',
				content: ''
			}}
			validationSchema={AddQuestionSchema}
			onSubmit={createQuestion}
		>
			{({errors, touched}) => {
				return (
					<div>
						<Form className="form">
							<h1 className="register-title">Ask Question</h1>
							<AddQuestionFields errors={errors} touched={touched}/>
							<div className="mx-auto">
								<SubmitButton content="Ask" />
							</div>
						</Form>
					</div>
				)
			}}
		</Formik>
	);
};

export default AddQuestionForm;